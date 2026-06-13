import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Building2, FileText, Home, Images, LayoutTemplate, Mail, MapPinned, PanelTop, Settings, SquareMenu, Users, WandSparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: BarChart3, end: true },
  { to: '/admin/projeler', label: 'Projeler', icon: Building2 },
  { to: '/admin/sirketler', label: 'Şirketler', icon: Home },
  { to: '/admin/harita', label: 'Harita', icon: MapPinned },
  { to: '/admin/yonetim', label: 'Yönetim', icon: Users },
  { to: '/admin/header', label: 'Header', icon: PanelTop },
  { to: '/admin/footer', label: 'Footer', icon: SquareMenu },
  { to: '/admin/hero', label: 'Hero Slider', icon: WandSparkles },
  { to: '/admin/hakkimizda', label: 'Hakkımızda', icon: LayoutTemplate },
  { to: '/admin/iletisim', label: 'İletişim', icon: Mail },
  { to: '/admin/blog', label: 'Blog', icon: FileText },
  { to: '/admin/medya', label: 'Medya', icon: Images },
  { to: '/admin/ayarlar', label: 'Ayarlar', icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="w-full border-b border-white/10 bg-zinc-950/95 px-4 py-4 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
      <NavLink to="/admin" className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gold text-sm font-black text-zinc-950">
          SL
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Starlife</p>
          <p className="text-xs text-zinc-500">Admin Panel</p>
        </div>
      </NavLink>

      <nav className="grid gap-1">
        {adminLinks.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-zinc-400 transition',
                'hover:bg-white/5 hover:text-white',
                isActive && 'bg-gold/15 text-gold ring-1 ring-gold/25',
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
