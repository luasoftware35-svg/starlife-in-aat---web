import React from 'react';
import { Outlet, useOutletContext, useLocation } from 'react-router-dom';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';

const titles = {
  '/admin': 'Dashboard',
  '/admin/projeler': 'Projeler',
  '/admin/sirketler': 'Şirketler',
  '/admin/harita': 'Operasyon Haritası',
  '/admin/yonetim': 'Yönetim Kurulu',
  '/admin/header': 'Header',
  '/admin/footer': 'Footer',
  '/admin/hero': 'Hero Slider',
  '/admin/hakkimizda': 'Hakkımızda',
  '/admin/iletisim': 'İletişim',
  '/admin/blog': 'Blog',
  '/admin/medya': 'Medya',
  '/admin/ayarlar': 'Ayarlar',
  '/admin/projects': 'Projeler',
  '/admin/companies': 'Şirketler',
  '/admin/map': 'Operasyon Haritası',
  '/admin/team': 'Yönetim Kurulu',
  '/admin/about': 'Hakkımızda',
  '/admin/contact': 'İletişim',
  '/admin/media': 'Medya',
  '/admin/settings': 'Ayarlar',
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
