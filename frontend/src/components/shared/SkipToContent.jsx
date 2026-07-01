import React from 'react';

export default function SkipToContent({ targetId = 'main-content', label = 'İçeriğe atla' }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-gold"
    >
      {label}
    </a>
  );
}
