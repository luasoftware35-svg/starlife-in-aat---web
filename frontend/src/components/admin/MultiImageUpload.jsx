import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ImagePlus, Trash2 } from 'lucide-react';
import { uploadPublicFile } from '@/lib/supabase/admin';

export default function MultiImageUpload({ value = [], onChange, bucket = 'media', folder = 'project-gallery' }) {
  const [uploading, setUploading] = useState(false);
  const images = Array.isArray(value) ? value : [];

  const handleFiles = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setUploading(true);
    try {
      const uploadedUrls = [];

      for (const file of files) {
        const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
        const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`;
        uploadedUrls.push(await uploadPublicFile(bucket, path, file));
      }

      onChange([...images, ...uploadedUrls]);
      toast.success(`${uploadedUrls.length} görsel yüklendi.`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const removeImage = (targetUrl) => {
    onChange(images.filter((url) => url !== targetUrl));
  };

  return (
    <div className="space-y-4">
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {images.map((url) => (
            <div key={url} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
              <img src={url} alt="" className="h-28 w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute right-2 top-2 rounded-full bg-zinc-950/80 p-2 text-white opacity-0 transition group-hover:opacity-100"
                aria-label="Görseli kaldır"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-5 text-sm text-zinc-400 transition hover:border-gold/50 hover:text-gold">
        <ImagePlus className="h-5 w-5" />
        {uploading ? 'Görseller yükleniyor...' : 'Galeriye görsel ekle'}
        <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} disabled={uploading} />
      </label>
    </div>
  );
}
