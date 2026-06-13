import React from 'react';

export default function StatCard({ label, value, helper, icon: Icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-zinc-400">{label}</p>
        {Icon && (
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gold/15 text-gold">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      <p className="text-3xl font-semibold text-white">{value}</p>
      {helper && <p className="mt-2 text-xs text-zinc-500">{helper}</p>}
    </div>
  );
}
