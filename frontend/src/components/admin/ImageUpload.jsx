import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { UploadCloud } from 'lucide-react';
import { uploadPublicFile } from '@/lib/supabase/admin';

export default function ImageUpload({ value, onChange, bucket = 'media', folder = 'admin' }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
      const path = `${folder}/${Date.now()}-${safeName}`;
      const publicUrl = await uploadPublicFile(bucket, path, file);
      onChange(publicUrl);
      toast.success('Görsel yüklendi.');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {value && (
        <img src={value} alt="" className="h-32 w-full rounded-2xl border border-white/10 object-cover" />
      )}
      <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-5 text-sm text-zinc-400 transition hover:border-gold/50 hover:text-gold">
        <UploadCloud className="h-5 w-5" />
        {uploading ? 'Yükleniyor...' : 'Görsel yükle'}
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
    </div>
  );
}
