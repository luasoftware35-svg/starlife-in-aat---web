import React from 'react';
import { X } from 'lucide-react';

export default function ConfirmModal({ open, title, description, confirmLabel = 'Sil', onConfirm, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            {description && <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>}
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-zinc-500 hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-white/10">
            Vazgeç
          </button>
          <button type="button" onClick={onConfirm} className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
