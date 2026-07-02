import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { COMPANY as DEFAULT_COMPANY } from '../mock/mock';
import { supabase } from './supabase/client';

const SiteSettingsContext = createContext({
  company: DEFAULT_COMPANY,
  settings: {},
  loading: false,
});

const SETTING_MAP = {
  'contact.email': 'email',
  'contact.phone': 'phone',
  'contact.address': 'address',
  'company.name': 'name',
  'company.slogan': 'slogan',
  'company.founder': 'founder',
  'company.founded': 'founded',
};

function mergeCompany(defaults, settingsMap) {
  const merged = { ...defaults };
  Object.entries(SETTING_MAP).forEach(([key, field]) => {
    const value = settingsMap[key];
    if (value === undefined || value === null || value === '') return;
    merged[field] = field === 'founded' ? Number(value) || defaults.founded : value;
  });
  return merged;
}

async function fetchSettingsMap() {
  if (!supabase) return {};
  const { data, error } = await supabase.from('site_settings').select('key, value');
  if (error || !data?.length) return {};
  return Object.fromEntries(data.map((row) => [row.key, row.value]));
}

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    let mounted = true;
    fetchSettingsMap()
      .then((map) => {
        if (mounted) setSettings(map);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const company = useMemo(() => mergeCompany(DEFAULT_COMPANY, settings), [settings]);
  const value = useMemo(() => ({ company, settings, loading }), [company, settings, loading]);

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

export function useCompany() {
  return useContext(SiteSettingsContext).company;
}

export { fetchSettingsMap, mergeCompany };
