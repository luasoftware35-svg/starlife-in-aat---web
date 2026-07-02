-- Sync CMS seed: team roster + social links (site matches admin)

-- Ayetullah Yağmur (missing from admin)
INSERT INTO public.team_members (name, title, bio, image, order_index, active)
SELECT
  'Ayetullah Yağmur',
  'Genel Koordinatör',
  'Genel koordinatör olarak grup şirketleri arası operasyonel uyumu sağlamak, proje süreçlerini koordine etmek ve kurumsal hedeflerin sahada etkin biçimde uygulanmasına liderlik etmektedir.',
  '',
  4,
  true
WHERE NOT EXISTS (
  SELECT 1 FROM public.team_members WHERE name = 'Ayetullah Yağmur'
);

-- Normalize order: 1=CEO (top), 2-4=board (titles unchanged)
UPDATE public.team_members SET order_index = 1, active = true WHERE name = 'Numan Erdoğan';
UPDATE public.team_members SET order_index = 2, active = true WHERE name = 'Ahmet Erdoğan';
UPDATE public.team_members SET order_index = 3, active = true WHERE name = 'Mahmut Erdoğan';
UPDATE public.team_members SET order_index = 4, active = true WHERE name = 'Ayetullah Yağmur';

-- Social media (editable in Admin > Ayarlar)
INSERT INTO public.site_settings (key, value, group_name)
VALUES
  ('social.facebook', 'https://www.facebook.com/profile.php?id=61572449155197', 'social'),
  ('social.instagram', 'https://www.instagram.com/starlifeinsaatt/', 'social'),
  ('social.twitter', 'https://x.com/StarLifeGroup1', 'social'),
  ('social.linkedin', 'https://www.linkedin.com/company/star-life-group/', 'social'),
  ('social.youtube', 'https://www.youtube.com/@Starlifeİnşaat', 'social')
ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = now();
