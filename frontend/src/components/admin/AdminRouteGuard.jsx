import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getCurrentAdminSession } from '@/lib/supabase/admin';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export default function AdminRouteGuard() {
  const location = useLocation();
  const [state, setState] = useState({ loading: true, user: null });

  useEffect(() => {
    let isMounted = true;

    getCurrentAdminSession()
      .then(({ user }) => {
        if (isMounted) setState({ loading: false, user });
      })
      .catch(() => {
        if (isMounted) setState({ loading: false, user: null });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isSupabaseConfigured) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (state.loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-zinc-950 text-zinc-300">
        Admin oturumu kontrol ediliyor...
      </div>
    );
  }

  if (!state.user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet context={{ user: state.user }} />;
}
