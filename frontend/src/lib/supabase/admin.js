import { requireSupabase, supabase } from './client';

export async function getCurrentAdminSession() {
  if (!supabase) {
    return { session: null, user: null, adminUser: null };
  }

  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;

  const user = data.session?.user || null;
  const adminUser = user ? await getAdminProfileForUser(user.id) : null;

  return {
    session: data.session,
    user: adminUser ? user : null,
    adminUser,
  };
}

export async function getAdminProfileForUser(userId) {
  if (!userId) return null;

  const client = requireSupabase();
  const { data, error } = await client
    .from('admin_users')
    .select('user_id,email,role,created_at')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return data || null;
}

export async function signInAdmin({ email, password }) {
  const client = requireSupabase();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  const adminUser = await getAdminProfileForUser(data.user?.id);

  if (!adminUser) {
    await client.auth.signOut();
    throw new Error('Bu hesabın admin yetkisi yok.');
  }

  return data;
}

export async function signOutAdmin() {
  const client = requireSupabase();
  const { error } = await client.auth.signOut();
  if (error) throw error;
}

export async function listRows(table, { orderBy = 'created_at', ascending = false, limit = 100 } = {}) {
  const client = requireSupabase();
  let query = client.from(table).select('*').limit(limit);

  if (orderBy) {
    query = query.order(orderBy, { ascending });
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getRowById(table, id) {
  const client = requireSupabase();
  const { data, error } = await client.from(table).select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function upsertRow(table, values) {
  const client = requireSupabase();
  const payload = {
    ...values,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await client.from(table).upsert(payload).select('*').single();
  if (error) throw error;
  return data;
}

export async function deleteRow(table, id) {
  const client = requireSupabase();
  const { error } = await client.from(table).delete().eq('id', id);
  if (error) throw error;
}

export async function uploadPublicFile(bucket, path, file) {
  const client = requireSupabase();
  const { data, error } = await client.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: true,
  });

  if (error) throw error;

  const { data: publicUrl } = client.storage.from(bucket).getPublicUrl(data.path);
  return publicUrl.publicUrl;
}
