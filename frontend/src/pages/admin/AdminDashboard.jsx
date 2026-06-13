import React, { useEffect, useState } from 'react';
import { Building2, FileText, MapPinned, Users } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { listRows } from '@/lib/supabase/admin';

const cards = [
  { table: 'projects', label: 'Projects', icon: Building2 },
  { table: 'blog_posts', label: 'Blog Posts', icon: FileText },
  { table: 'team_members', label: 'Team Members', icon: Users },
  { table: 'map_locations', label: 'Map Locations', icon: MapPinned },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all(cards.map((card) => listRows(card.table, { limit: 500 }).then((rows) => [card.table, rows.length])))
      .then((entries) => setStats(Object.fromEntries(entries)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="space-y-8">
      {error && (
        <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-5 text-sm text-amber-100">
          Supabase tabloları hazır değilse istatistikler yüklenemez: {error}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <StatCard
            key={card.table}
            label={card.label}
            value={stats[card.table] ?? '0'}
            helper="Supabase kayıt sayısı"
            icon={card.icon}
          />
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <p className="text-xs uppercase tracking-[0.28em] text-gold">Content Workflow</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Starlife içerik yönetimi</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
          Bu panel React Router içinde izole çalışır. Public site mevcut hardcoded içerikleriyle korunur; Supabase tabloları hazır olduğunda
          admin ekranları projeler, blog, hero, ekip, harita ve ayarlar için CRUD işlemlerini aynı yardımcı fonksiyonlar üzerinden yürütür.
        </p>
      </section>
    </div>
  );
}
