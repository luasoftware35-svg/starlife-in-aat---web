import React from 'react';
import { useOutletContext } from 'react-router-dom';
import AdminUsersPanel from '@/components/admin/AdminUsersPanel';
import AdminSiteSettingsPanel from '@/components/admin/AdminSiteSettingsPanel';
import AdminResourceList from './AdminResourceList';

export default function AdminSettings() {
  const { user } = useOutletContext();

  return (
    <div className="space-y-8">
      <AdminSiteSettingsPanel />
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <h3 className="text-lg font-semibold text-white">Site – Admin eşleşmesi</h3>
        <ul className="mt-4 space-y-2 text-sm text-zinc-400">
          <li><strong className="text-zinc-200">Yönetim Kurulu</strong> → /kurumsal/yonetim (sıra: order_index, 1=üstteki CEO)</li>
          <li><strong className="text-zinc-200">Projeler</strong> → Starlife / Invest / ERD proje sayfaları</li>
          <li><strong className="text-zinc-200">Taahhüt</strong> → /starlife-insaat/taahhut/*</li>
          <li><strong className="text-zinc-200">Hero Slider</strong> → Ana sayfa</li>
          <li><strong className="text-zinc-200">Harita</strong> → Operasyon haritası</li>
          <li><strong className="text-zinc-200">Blog</strong> → Bizden Haberler</li>
        </ul>
      </section>
      <AdminResourceList resource="settings" />
      <AdminUsersPanel currentUser={user} />
    </div>
  );
}
