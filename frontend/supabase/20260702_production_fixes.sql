-- Production fixes: forms, taahhut CMS, admin-only RLS, applications storage.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

-- Contact form submissions
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  source text not null default 'holding',
  kvkk_accepted boolean not null default false,
  created_at timestamptz not null default now()
);

-- HR / job applications
create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  position text,
  summary text not null,
  cv_url text,
  cv_filename text,
  kvkk_accepted boolean not null default false,
  created_at timestamptz not null default now()
);

-- Taahhüt projects (CMS-managed)
create table if not exists public.taahhut_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  status text not null default 'Tamamlanan',
  year text,
  tag text,
  units integer,
  institution text,
  sqm integer,
  sqm_label text,
  location text,
  cover_image text,
  images jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;
alter table public.taahhut_projects enable row level security;
alter table public.job_applications enable row level security;

-- Public can submit forms
drop policy if exists "Public insert contact submissions" on public.contact_submissions;
create policy "Public insert contact submissions" on public.contact_submissions
  for insert with check (true);

drop policy if exists "Admin read contact submissions" on public.contact_submissions;
create policy "Admin read contact submissions" on public.contact_submissions
  for select using (public.is_admin());

drop policy if exists "Admin delete contact submissions" on public.contact_submissions;
create policy "Admin delete contact submissions" on public.contact_submissions
  for delete using (public.is_admin());

drop policy if exists "Public insert job applications" on public.job_applications;
create policy "Public insert job applications" on public.job_applications
  for insert with check (true);

drop policy if exists "Admin read job applications" on public.job_applications;
create policy "Admin read job applications" on public.job_applications
  for select using (public.is_admin());

drop policy if exists "Admin delete job applications" on public.job_applications;
create policy "Admin delete job applications" on public.job_applications
  for delete using (public.is_admin());

-- Taahhüt: public read active, admin manage
drop policy if exists "Public read taahhut projects" on public.taahhut_projects;
create policy "Public read taahhut projects" on public.taahhut_projects
  for select using (active = true or public.is_admin());

drop policy if exists "Admin manage taahhut projects" on public.taahhut_projects;
create policy "Admin manage taahhut projects" on public.taahhut_projects
  for all using (public.is_admin()) with check (public.is_admin());

-- Tighten CMS tables: admin-only writes
drop policy if exists "Authenticated manage projects" on public.projects;
drop policy if exists "Admin manage projects" on public.projects;
create policy "Admin manage projects" on public.projects
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated manage hero slides" on public.hero_slides;
drop policy if exists "Admin manage hero slides" on public.hero_slides;
create policy "Admin manage hero slides" on public.hero_slides
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated manage team members" on public.team_members;
drop policy if exists "Admin manage team members" on public.team_members;
create policy "Admin manage team members" on public.team_members
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated manage map locations" on public.map_locations;
drop policy if exists "Admin manage map locations" on public.map_locations;
create policy "Admin manage map locations" on public.map_locations
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated manage blog posts" on public.blog_posts;
drop policy if exists "Admin manage blog posts" on public.blog_posts;
create policy "Admin manage blog posts" on public.blog_posts
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public read blog posts" on public.blog_posts;
create policy "Public read blog posts" on public.blog_posts
  for select using (published = true or public.is_admin());

drop policy if exists "Authenticated manage site settings" on public.site_settings;
drop policy if exists "Admin manage site settings" on public.site_settings;
create policy "Admin manage site settings" on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated read admin users" on public.admin_users;
drop policy if exists "Admin read admin users" on public.admin_users;
create policy "Admin read admin users" on public.admin_users
  for select using (public.is_admin());

-- Applications storage bucket (CV uploads)
insert into storage.buckets (id, name, public)
values ('applications', 'applications', false)
on conflict (id) do nothing;

drop policy if exists "Public upload applications" on storage.objects;
create policy "Public upload applications" on storage.objects
  for insert with check (bucket_id = 'applications');

drop policy if exists "Admin read applications" on storage.objects;
create policy "Admin read applications" on storage.objects
  for select using (bucket_id = 'applications' and public.is_admin());

drop policy if exists "Admin delete applications" on storage.objects;
create policy "Admin delete applications" on storage.objects
  for delete using (bucket_id = 'applications' and public.is_admin());

-- Tighten media bucket to admin-only mutations
drop policy if exists "Authenticated upload media" on storage.objects;
drop policy if exists "Admin upload media" on storage.objects;
create policy "Admin upload media" on storage.objects
  for insert with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "Authenticated update media" on storage.objects;
drop policy if exists "Admin update media" on storage.objects;
create policy "Admin update media" on storage.objects
  for update using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "Authenticated delete media" on storage.objects;
drop policy if exists "Admin delete media" on storage.objects;
create policy "Admin delete media" on storage.objects
  for delete using (bucket_id = 'media' and public.is_admin());

-- Corporate contact email
insert into public.site_settings (key, value, group_name)
values
  ('contact.email', 'iletisim@starlifeinsaat.com', 'contact'),
  ('contact.phone', '0412 504 10 08', 'contact'),
  ('contact.address', 'Ceysa Serhat Plaza B Blok Kat 2 No:2 Kayapınar/Diyarbakır', 'contact'),
  ('company.name', 'Starlife İnşaat', 'general'),
  ('company.slogan', 'Güvenli ve Modern Yaşam Alanları', 'general'),
  ('company.founded', '2009', 'general'),
  ('company.founder', 'Numan Erdoğan', 'general')
on conflict (key) do update set value = excluded.value, updated_at = now();

update public.site_settings
set value = 'iletisim@starlifeinsaat.com', updated_at = now()
where key = 'contact.email';
