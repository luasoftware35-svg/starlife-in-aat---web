import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { loginSchema } from '@/lib/validations/adminSchemas';
import { signInAdmin } from '@/lib/supabase/admin';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  if (location.pathname !== '/admin/login' && isSupabaseConfigured) {
    return <Navigate to="/admin/login" replace />;
  }

  const onSubmit = async (values) => {
    try {
      await signInAdmin(values);
      toast.success('Admin girişi başarılı.');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-zinc-950 px-4 text-white">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Starlife İnşaat</p>
          <h1 className="mt-3 text-3xl font-semibold">Admin Panel</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Supabase Auth email/password hesabınızla giriş yapın.
          </p>
        </div>

        {!isSupabaseConfigured && (
          <div className="mb-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
            Supabase yapılandırması eksik. `REACT_APP_SUPABASE_URL` ve `REACT_APP_SUPABASE_ANON_KEY` tanımlanmalı.
          </div>
        )}

        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <label className="block">
            <span className="mb-2 block text-sm text-zinc-300">E-posta</span>
            <input
              type="email"
              {...form.register('email')}
              className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none transition focus:border-gold/50"
              placeholder="admin@starlife.com"
            />
            {form.formState.errors.email && <span className="mt-2 block text-xs text-red-300">{form.formState.errors.email.message}</span>}
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-zinc-300">Şifre</span>
            <input
              type="password"
              {...form.register('password')}
              className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none transition focus:border-gold/50"
              placeholder="••••••••"
            />
            {form.formState.errors.password && <span className="mt-2 block text-xs text-red-300">{form.formState.errors.password.message}</span>}
          </label>
          <button
            type="submit"
            disabled={form.formState.isSubmitting || !isSupabaseConfigured}
            className="w-full rounded-2xl bg-gold px-5 py-3 font-semibold text-zinc-950 transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            {form.formState.isSubmitting ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}
