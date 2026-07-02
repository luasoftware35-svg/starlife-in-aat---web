import { supabase, requireSupabase } from './supabase/client';

const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export async function submitContactForm(payload) {
  const client = supabase || requireSupabase();
  const { error } = await client.from('contact_submissions').insert({
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone?.trim() || null,
    message: payload.message.trim(),
    source: payload.source || 'holding',
    kvkk_accepted: Boolean(payload.kvkkAccepted),
  });
  if (error) throw error;
}

export async function uploadCvFile(file) {
  if (!file) return { cvUrl: null, cvFilename: null };
  if (file.size > MAX_CV_BYTES) {
    throw new Error('CV dosyası en fazla 5 MB olabilir.');
  }
  if (!ALLOWED_CV_TYPES.includes(file.type)) {
    throw new Error('CV dosyası PDF veya Word formatında olmalıdır.');
  }

  const client = supabase || requireSupabase();
  const safeName = file.name.replace(/[^\w.\-()]/g, '_').slice(0, 120);
  const path = `${Date.now()}-${crypto.randomUUID()}/${safeName}`;

  const { error } = await client.storage.from('applications').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;

  return { cvUrl: path, cvFilename: safeName };
}

export async function submitJobApplication(payload) {
  const client = supabase || requireSupabase();
  let cvUrl = null;
  let cvFilename = null;

  if (payload.cvFile) {
    const uploaded = await uploadCvFile(payload.cvFile);
    cvUrl = uploaded.cvUrl;
    cvFilename = uploaded.cvFilename;
  }

  const { error } = await client.from('job_applications').insert({
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone?.trim() || null,
    position: payload.position?.trim() || null,
    summary: payload.summary.trim(),
    cv_url: cvUrl,
    cv_filename: cvFilename,
    kvkk_accepted: Boolean(payload.kvkkAccepted),
  });
  if (error) throw error;
}
