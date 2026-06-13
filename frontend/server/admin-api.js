const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env.local'), override: true });

const PORT = Number(process.env.ADMIN_API_PORT || 3001);
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing REACT_APP_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

function send(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.ADMIN_API_ORIGIN || 'http://localhost:3000',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  });
  res.end(JSON.stringify(payload));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) req.destroy();
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

async function requireAdmin(req) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) {
    const error = new Error('Oturum bulunamadı.');
    error.status = 401;
    throw error;
  }

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
  if (userError || !userData.user) {
    const error = new Error('Oturum geçersiz.');
    error.status = 401;
    throw error;
  }

  const { data: adminUser, error: adminError } = await supabaseAdmin
    .from('admin_users')
    .select('user_id,email,role,created_at')
    .eq('user_id', userData.user.id)
    .maybeSingle();

  if (adminError) throw adminError;
  if (!adminUser) {
    const error = new Error('Bu hesabın admin yetkisi yok.');
    error.status = 403;
    throw error;
  }

  return { user: userData.user, adminUser };
}

async function listAdminUsers(req, res) {
  await requireAdmin(req);
  const { data, error } = await supabaseAdmin
    .from('admin_users')
    .select('user_id,email,role,created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  send(res, 200, { users: data || [] });
}

async function createAdminUser(req, res) {
  await requireAdmin(req);
  const body = await readJson(req);
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');

  if (!email || password.length < 6) {
    return send(res, 400, { error: 'E-posta ve en az 6 karakter şifre zorunludur.' });
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: 'admin' },
  });

  if (error) throw error;

  const { error: upsertError } = await supabaseAdmin.from('admin_users').upsert({
    user_id: data.user.id,
    email: data.user.email,
    role: 'admin',
  });

  if (upsertError) throw upsertError;
  send(res, 201, { user: { user_id: data.user.id, email: data.user.email, role: 'admin' } });
}

async function deleteAdminUser(req, res, userId) {
  const { user } = await requireAdmin(req);
  if (user.id === userId) {
    return send(res, 400, { error: 'Kendi admin hesabınızı silemezsiniz.' });
  }

  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (error) throw error;

  await supabaseAdmin.from('admin_users').delete().eq('user_id', userId);
  send(res, 200, { ok: true });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === '/api/admin-users' && req.method === 'GET') {
      return await listAdminUsers(req, res);
    }

    if (url.pathname === '/api/admin-users' && req.method === 'POST') {
      return await createAdminUser(req, res);
    }

    const deleteMatch = url.pathname.match(/^\/api\/admin-users\/([^/]+)$/);
    if (deleteMatch && req.method === 'DELETE') {
      return await deleteAdminUser(req, res, decodeURIComponent(deleteMatch[1]));
    }

    send(res, 404, { error: 'Not found' });
  } catch (error) {
    send(res, error.status || 500, { error: error.message || 'Server error' });
  }
});

server.listen(PORT, () => {
  console.log(`Admin API listening on http://localhost:${PORT}`);
});
