import React from 'react';

const LOGO_SRC = '/img/starlife.png';

export default function BrandLogo({ variant = 'dark', className = '', width = 140, height = 40 }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Starlife İnşaat"
      width={width}
      height={height}
      className={`object-contain ${variant === 'light' ? 'brightness-0 invert' : ''} ${className}`}
    />
  );
}
