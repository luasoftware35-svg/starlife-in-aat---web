export const COOKIE_CONSENT_KEY = 'starlife-cookie-consent';
export const COOKIE_CONSENT_EVENT = 'starlife-cookie-consent-change';

export function getCookieConsent() {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setCookieConsent(value) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
  } catch {
    // ignore storage errors
  }
}

export function hasFunctionalConsent() {
  return getCookieConsent() === 'all';
}
