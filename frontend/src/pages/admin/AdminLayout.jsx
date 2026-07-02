import React from 'react';
import { Outlet, useOutletContext, useLocation } from 'react-router-dom';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';

const titles = {
  '/admin': 'Dashboard',
  '/admin/projeler': 'Projeler',
  '/admin/taahhut': 'Taahhüt',
  '/admin/harita': 'Operasyon Haritası',
  '/admin/yonetim': 'Yönetim Kurulu',
  '/admin/hero': 'Hero Slider',
  '/admin/blog': 'Blog',
  '/admin/mesajlar': 'İletişim Mesajları',
  '/admin/basvurular': 'İK Başvuruları',
  '/admin/medya': 'Medya',
  '/admin/ayarlar': 'Site Ayarları',
  '/admin/projects': 'Projeler',
  '/admin/map': 'Operasyon Haritası',
  '/admin/team': 'Yönetim Kurulu',
  '/admin/media': 'Medya',
  '/admin/settings': 'Site Ayarları',
};

export default function AdminLayout() {
  const { user } = useOutletContext();
  const location = useLocation();
  const basePath = Object.keys(titles).find((path) => location.pathname === path || location.pathname.startsWith(`${path}/`));

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="lg:flex">
        <AdminSidebar />
        <div className="min-w-0 flex-1">
          <AdminHeader title={titles[basePath] || 'Admin'} user={user} />
          <main className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8">
            <Outlet context={{ user }} />
          </main>
        </div>
      </div>
    </div>
  );
}
