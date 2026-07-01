import React from 'react';
import { Link } from 'react-router-dom';
import { policyPaths } from '../../lib/policyPaths';

export default function KvkkConsentCheckbox({
  checked,
  onChange,
  policyBasePath = '',
  darkMode = false,
  id = 'kvkk-consent',
}) {
  const { kvkk } = policyPaths(policyBasePath);
  const textClass = darkMode ? 'text-white/70' : 'text-ink/70';
  const linkClass = darkMode ? 'text-pomegranate-light underline hover:text-white' : 'text-pomegranate underline hover:text-ink';

  return (
    <label htmlFor={id} className={`flex items-start gap-3 cursor-pointer text-sm leading-relaxed ${textClass}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required
        className="mt-1 h-4 w-4 shrink-0 accent-pomegranate"
      />
      <span>
        <Link to={kvkk} className={linkClass}>
          KVKK Aydınlatma Metni
        </Link>
        {' '}ni okudum; kişisel verilerimin belirtilen kapsamda işlenmesini kabul ediyorum. *
      </span>
    </label>
  );
}
