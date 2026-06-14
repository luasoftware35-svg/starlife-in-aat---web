import { z } from 'zod';

const optionalUrl = z.string().trim().url('Geçerli bir URL girin.').or(z.literal('')).optional();
const optionalText = z.string().trim().optional().or(z.literal(''));

export const loginSchema = z.object({
  email: z.string().trim().email('Geçerli bir e-posta adresi girin.'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır.'),
});

export const projectSchema = z.object({
  title: z.string().trim().min(2, 'Proje başlığı zorunludur.'),
  slug: z.string().trim().min(2, 'Slug zorunludur.'),
  description: optionalText,
  city: optionalText,
  region: optionalText,
  company: z.string().trim().min(1, 'Şirket zorunludur.'),
  status: z.string().trim().min(1, 'Durum zorunludur.'),
  tag: optionalText,
  units: z.coerce.number().int().optional(),
  sqm: z.coerce.number().int().optional(),
  year: optionalText,
  cover_image: optionalUrl,
  images: z.array(z.string().trim().url('Geçerli bir URL girin.')).nullable().optional(),
  featured: z.boolean().optional(),
  order_index: z.coerce.number().int().min(0).optional(),
});

export const blogSchema = z.object({
  title: z.string().trim().min(2, 'Blog başlığı zorunludur.'),
  slug: z.string().trim().min(2, 'Slug zorunludur.'),
  excerpt: optionalText,
  cover_image: optionalUrl,
  content: optionalText,
  published: z.boolean().optional(),
});

export const heroSlideSchema = z.object({
  tag: z.string().trim().min(1, 'Etiket zorunludur.'),
  title: z.string().trim().min(2, 'Başlık zorunludur.'),
  description: optionalText,
  image: optionalUrl,
  cta_text: optionalText,
  cta_href: optionalText,
  order_index: z.coerce.number().int().min(0).optional(),
  active: z.boolean().optional(),
});

export const teamSchema = z.object({
  name: z.string().trim().min(2, 'Ad soyad zorunludur.'),
  title: z.string().trim().min(2, 'Unvan zorunludur.'),
  image: optionalUrl,
  bio: optionalText,
  order_index: z.coerce.number().int().min(0).optional(),
  active: z.boolean().optional(),
});

export const mapLocationSchema = z.object({
  city: z.string().trim().min(2, 'Şehir zorunludur.'),
  region: optionalText,
  title: optionalText,
  description: optionalText,
  company: optionalText,
  cx: optionalText,
  cy: optionalText,
  order_index: z.coerce.number().int().min(0).optional(),
  active: z.boolean().optional(),
});

export const settingsSchema = z.object({
  key: z.string().trim().min(2, 'Ayar anahtarı zorunludur.'),
  value: z.string().trim().min(1, 'Ayar değeri zorunludur.'),
  group_name: optionalText,
});

export const resourceSchemas = {
  projects: projectSchema,
  blog: blogSchema,
  hero: heroSlideSchema,
  team: teamSchema,
  map: mapLocationSchema,
  settings: settingsSchema,
};
