import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2, UserPlus } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

const ADMIN_API_URL = process.env.REACT_APP_ADMIN_API_URL || 'http://localhost:3001';

async function adminApi(path, options = {}) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (!token) {
    throw new Error('Admin oturumu bulunamadı.');
  }

  const response = await fetch(`${ADMIN_API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || 'Admin kullanıcı işlemi başarısız.');
  }

  return payload;
}

export default function AdminUsersPanel({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const payload = await adminApi('/api/admin-users');
      setUsers(payload.users || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await adminApi('/api/admin-users', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      toast.success('Admin kullanıcı oluşturuldu.');
      setForm({ email: '', password: '' });
      loadUsers();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (adminUser) => {
    if (adminUser.user_id === currentUser?.id) return;
    const confirmed = window.confirm(`${adminUser.email} admin kullanıcısı silinsin mi?`);
    if (!confirmed) return;

    try {
      await adminApi(`/api/admin-users/${adminUser.user_id}`, { method: 'DELETE' });
      toast.success('Admin kullanıcı silindi.');
      loadUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-gold">Admin Kullanıcıları</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Yetkili hesaplar</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Kullanıcı oluşturma ve silme işlemleri service role key kullanan server-only API üzerinden yapılır.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 rounded-3xl border border-white/10 bg-zinc-950/50 p-4 lg:grid-cols-[1fr_1fr_auto]">
        <input
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          placeholder="admin@starlife.com"
          className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-gold/50"
          required
        />
        <input
          type="password"
          value={form.password}
          onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          placeholder="Şifre"
          className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-gold/50"
          minLength={6}
          required
        />
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-gold-light disabled:opacity-50"
        >
          <UserPlus className="h-4 w-4" />
          {saving ? 'Ekleniyor...' : 'Admin Ekle'}
        </button>
      </form>

      <div className="overflow-hidden rounded-3xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.2em] text-zinc-500">
            <tr>
              <th className="px-5 py-4 font-medium">E-posta</th>
              <th className="px-5 py-4 font-medium">Rol</th>
              <th className="px-5 py-4 font-medium">Oluşturulma</th>
              <th className="px-5 py-4 text-right font-medium">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-5 py-6 text-zinc-400">Admin kullanıcıları yükleniyor...</td>
              </tr>
            ) : users.length ? (
              users.map((adminUser) => {
                const isCurrentUser = adminUser.user_id === currentUser?.id;
                return (
                  <tr key={adminUser.user_id} className="text-zinc-300">
                    <td className="px-5 py-4">{adminUser.email}</td>
                    <td className="px-5 py-4">{adminUser.role}</td>
                    <td className="px-5 py-4">{new Date(adminUser.created_at).toLocaleDateString('tr-TR')}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleDelete(adminUser)}
                          disabled={isCurrentUser}
                          className="rounded-full border border-white/10 p-2 text-zinc-400 transition hover:border-red-400/50 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label="Admin kullanıcı sil"
                          title={isCurrentUser ? 'Kendi hesabınızı silemezsiniz' : 'Sil'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-5 py-6 text-zinc-400">Henüz admin kullanıcı yok.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
