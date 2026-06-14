-- Starlife admin panel schema for Supabase.
-- Run this file in Supabase SQL Editor before using /admin.

create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  city text,
  region text,
  company text not null default 'starlife',
  status text not null default 'devam',
  tag text,
  units integer,
  sqm integer,
  year text,
  cover_image text,
  images jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  tag text not null,
  title text not null,
  description text,
  image text,
  cta_text text,
  cta_href text,
  active boolean not null default true,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  image text,
  bio text,
  active boolean not null default true,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.map_locations (
  id uuid primary key default gen_random_uuid(),
  plate text,
  city text not null,
  region text,
  title text,
  description text,
  company text,
  image text,
  count integer,
  year text,
  units integer,
  sqm integer,
  status text,
  cx text,
  cy text,
  active boolean not null default true,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  cover_image text,
  content text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null,
  group_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_admin_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.admin_users (user_id, email, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'role', 'admin'))
  on conflict (user_id) do update
    set email = excluded.email,
        role = excluded.role;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_admin_user on auth.users;
create trigger on_auth_user_created_admin_user
  after insert on auth.users
  for each row execute function public.handle_new_admin_user();

alter table public.projects enable row level security;
alter table public.hero_slides enable row level security;
alter table public.team_members enable row level security;
alter table public.map_locations enable row level security;
alter table public.blog_posts enable row level security;
alter table public.site_settings enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Public read projects" on public.projects;
create policy "Public read projects" on public.projects for select using (true);
drop policy if exists "Authenticated manage projects" on public.projects;
create policy "Authenticated manage projects" on public.projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public read hero slides" on public.hero_slides;
create policy "Public read hero slides" on public.hero_slides for select using (true);
drop policy if exists "Authenticated manage hero slides" on public.hero_slides;
create policy "Authenticated manage hero slides" on public.hero_slides for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public read team members" on public.team_members;
create policy "Public read team members" on public.team_members for select using (true);
drop policy if exists "Authenticated manage team members" on public.team_members;
create policy "Authenticated manage team members" on public.team_members for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public read map locations" on public.map_locations;
create policy "Public read map locations" on public.map_locations for select using (true);
drop policy if exists "Authenticated manage map locations" on public.map_locations;
create policy "Authenticated manage map locations" on public.map_locations for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public read blog posts" on public.blog_posts;
create policy "Public read blog posts" on public.blog_posts for select using (published = true or auth.role() = 'authenticated');
drop policy if exists "Authenticated manage blog posts" on public.blog_posts;
create policy "Authenticated manage blog posts" on public.blog_posts for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public read site settings" on public.site_settings;
create policy "Public read site settings" on public.site_settings for select using (true);
drop policy if exists "Authenticated manage site settings" on public.site_settings;
create policy "Authenticated manage site settings" on public.site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated read admin users" on public.admin_users;
create policy "Authenticated read admin users" on public.admin_users for select using (auth.role() = 'authenticated');

insert into public.admin_users (user_id, email, role)
select id, email, coalesce(raw_user_meta_data->>'role', 'admin')
from auth.users
where email is not null
on conflict (user_id) do nothing;

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public read media" on storage.objects;
create policy "Public read media" on storage.objects for select using (bucket_id = 'media');
drop policy if exists "Authenticated upload media" on storage.objects;
create policy "Authenticated upload media" on storage.objects for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');
drop policy if exists "Authenticated update media" on storage.objects;
create policy "Authenticated update media" on storage.objects for update using (bucket_id = 'media' and auth.role() = 'authenticated') with check (bucket_id = 'media' and auth.role() = 'authenticated');
drop policy if exists "Authenticated delete media" on storage.objects;
create policy "Authenticated delete media" on storage.objects for delete using (bucket_id = 'media' and auth.role() = 'authenticated');

insert into public.site_settings (key, value, group_name)
values
  ('site.title', 'Starlife İnşaat', 'general'),
  ('contact.phone', '+90 000 000 00 00', 'contact'),
  ('contact.email', 'luasoftware35@gmail.com', 'contact')
on conflict (key) do nothing;
