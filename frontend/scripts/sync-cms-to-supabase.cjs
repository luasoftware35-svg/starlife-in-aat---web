#!/usr/bin/env node
/**
 * Sync mock CMS data into Supabase (team, taahhut, social settings).
 * Usage: SUPABASE_SERVICE_ROLE_KEY=... REACT_APP_SUPABASE_URL=... node scripts/sync-cms-to-supabase.cjs
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { createClient } = require('@supabase/supabase-js');

const root = path.join(__dirname, '..');

function loadEnvFiles() {
  for (const file of ['.env.local', '.env']) {
    const envPath = path.join(root, file);
    if (!fs.existsSync(envPath)) continue;
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      if (process.env[key]) continue;
      let value = trimmed.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
}

loadEnvFiles();

const url = process.env.REACT_APP_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Missing REACT_APP_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function loadTaahhutProjects() {
  const file = path.join(root, 'src/mock/taahhutProjects.js');
  const code = fs.readFileSync(file, 'utf8').replace('export const TAAHHUT_PROJECTS', 'const TAAHHUT_PROJECTS');
  return vm.runInNewContext(`${code}\nTAAHHUT_PROJECTS;`, {}, { filename: file });
}

const TEAM_SEED = [
  {
    name: 'Numan Erdoğan',
    title: 'CEO & Kurucu',
    bio: 'Starlife İnşaat vizyonunu şekillendiren liderlik anlayışıyla, kaliteli ve güvenli yaşam alanları üretme hedefi doğrultusunda çalışmalarını sürdürmektedir.',
    image: '',
    order_index: 1,
    active: true,
  },
  {
    name: 'Ahmet Erdoğan',
    title: 'Yönetim Kurulu Üyesi',
    bio: 'Yönetim kurulu üyesi olarak proje geliştirme, kurumsal büyüme ve sürdürülebilir yapı standartlarının güçlendirilmesi süreçlerinde aktif rol almaktadır.',
    image: '',
    order_index: 2,
    active: true,
  },
  {
    name: 'Mahmut Erdoğan',
    title: 'Yönetim Kurulu Üyesi',
    bio: 'Yönetim kurulu üyesi olarak operasyonel süreçlerin geliştirilmesi, kalite standartlarının korunması ve uzun vadeli değer üreten projelerin hayata geçirilmesine katkı sunmaktadır.',
    image: '',
    order_index: 3,
    active: true,
  },
  {
    name: 'Ayetullah Yağmur',
    title: 'Genel Koordinatör',
    bio: 'Genel koordinatör olarak grup şirketleri arası operasyonel uyumu sağlamak, proje süreçlerini koordine etmek ve kurumsal hedeflerin sahada etkin biçimde uygulanmasına liderlik etmektedir.',
    image: '',
    order_index: 4,
    active: true,
  },
];

const SOCIAL_SEED = [
  ['social.facebook', 'https://www.facebook.com/profile.php?id=61572449155197', 'social'],
  ['social.instagram', 'https://www.instagram.com/starlifeinsaatt/', 'social'],
  ['social.twitter', 'https://x.com/StarLifeGroup1', 'social'],
  ['social.linkedin', 'https://www.linkedin.com/company/star-life-group/', 'social'],
  ['social.youtube', 'https://www.youtube.com/@Starlifeİnşaat', 'social'],
];

async function syncTeam() {
  const { data: existing, error } = await supabase.from('team_members').select('id,name,image');
  if (error) throw error;

  const byName = new Map((existing || []).map((row) => [row.name, row]));

  for (const member of TEAM_SEED) {
    const current = byName.get(member.name);
    const payload = {
      name: member.name,
      title: current?.title || member.title,
      bio: current?.bio || member.bio,
      image: current?.image || member.image || null,
      order_index: member.order_index,
      active: member.active,
      updated_at: new Date().toISOString(),
    };

    if (current?.id) {
      const { error: updateError } = await supabase.from('team_members').update(payload).eq('id', current.id);
      if (updateError) throw updateError;
      console.log(`Updated team member: ${member.name}`);
    } else {
      const { error: insertError } = await supabase.from('team_members').insert(payload);
      if (insertError) throw insertError;
      console.log(`Inserted team member: ${member.name}`);
    }
  }
}

async function syncTaahhut() {
  const projects = loadTaahhutProjects();
  for (const [index, project] of projects.entries()) {
    const payload = {
      slug: project.slug,
      title: project.title,
      description: project.description || '',
      status: project.status || 'Tamamlanan',
      year: project.year || '',
      tag: project.tag || '',
      units: project.units || 0,
      institution: project.institution || 'TOKİ',
      sqm: project.sqm || 0,
      sqm_label: project.sqmLabel || project.sqm_label || '',
      location: project.location || '',
      cover_image: project.image || '',
      images: project.images || [],
      active: true,
      order_index: index + 1,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('taahhut_projects').upsert(payload, { onConflict: 'slug' });
    if (error) throw error;
    console.log(`Synced taahhut: ${project.title}`);
  }
}

async function syncSocialSettings() {
  for (const [key, value, group_name] of SOCIAL_SEED) {
    const { error } = await supabase.from('site_settings').upsert(
      { key, value, group_name, updated_at: new Date().toISOString() },
      { onConflict: 'key' },
    );
    if (error) throw error;
  }
  console.log('Synced social settings');
}

async function main() {
  await syncTeam();
  await syncSocialSettings();
  try {
    await syncTaahhut();
  } catch (error) {
    if (String(error.message || error).includes('taahhut_projects')) {
      console.warn('taahhut_projects table missing — run supabase migration first.');
    } else {
      throw error;
    }
  }
  console.log('CMS sync complete.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
