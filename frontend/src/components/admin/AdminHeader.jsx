import React from 'react';
import { LogOut, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { signOutAdmin } from '@/lib/supabase/admin';

export default function AdminHeader({ title = 'Dashboard', user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOutAdmin();
      toast.success('Çıkış yapıldı.');
      navigate('/admin/login', { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/90 px-4 py-4 backdrop-blur lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Admin</p>
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/starlife-insaat"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-gold/50 hover:text-gold"
          >
            Siteyi gör <ExternalLink className="h-4 w-4" />
          </Link>
          {user?.email && <span className="hidden text-sm text-zinc-500 md:inline">{user.email}</span>}
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
          >
            <LogOut className="h-4 w-4" />
            Çıkış
          </button>
        </div>
      </div>
    </header>
  );
}
