import React, { useState } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AdminMedia() {
  const [url, setUrl] = useState('');

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm text-zinc-500">Supabase Storage bucket: media</p>
        <h2 className="text-2xl font-semibold text-white">Media Library</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Görsel yükleyip dönen public URL değerini içerik formlarında kullanabilirsiniz. Tam galeri listeleme için Storage bucket policy ve
          listeleme izinlerinin Supabase tarafında açılması gerekir.
        </p>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <ImageUpload value={url} onChange={setUrl} folder="media-library" />
        {url && (
          <label className="mt-5 block">
            <span className="mb-2 block text-sm text-zinc-300">Public URL</span>
            <input
              value={url}
              readOnly
              className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 outline-none"
            />
          </label>
        )}
      </div>
    </div>
  );
}
