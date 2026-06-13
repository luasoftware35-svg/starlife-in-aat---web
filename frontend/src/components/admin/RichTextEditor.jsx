import React from 'react';

export default function RichTextEditor({ value = '', onChange, placeholder = 'İçerik yazın...' }) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={10}
      className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-gold/50"
    />
  );
}
