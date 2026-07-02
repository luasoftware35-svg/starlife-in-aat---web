import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import KvkkConsentCheckbox from './KvkkConsentCheckbox';
import { submitContactForm } from '../../lib/formSubmissions';
import { isSupabaseConfigured } from '../../lib/supabase/client';

function generateCaptcha() {
  const a = Math.floor(Math.random() * 8) + 1;
  const b = Math.floor(Math.random() * 8) + 1;
  return { a, b, answer: a + b };
}

function Field({ id, label, darkMode, children }) {
  const labelClass = darkMode ? 'text-white/70' : 'text-charcoal/70';
  return (
    <div>
      <label htmlFor={id} className={`mb-2 block text-[11px] tracking-[0.25em] uppercase ${labelClass}`}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm({ darkMode = true, policyBasePath = '', source = 'holding' }) {
  const [captcha] = useState(generateCaptcha);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', captcha: '' });
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!kvkkAccepted) {
      setStatus('consent');
      return;
    }
    if (Number(form.captcha) !== captcha.answer) {
      setStatus('error');
      return;
    }
    if (!isSupabaseConfigured) {
      setStatus('config');
      return;
    }

    setSubmitting(true);
    try {
      await submitContactForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        kvkkAccepted,
        source,
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '', captcha: '' });
      setKvkkAccepted(false);
    } catch {
      setStatus('failed');
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase = darkMode
    ? 'w-full bg-transparent border-b border-white/20 py-4 text-white text-[14px] focus:border-pomegranate-light outline-none placeholder:text-white/35 transition-colors font-light'
    : 'w-full bg-transparent border-b border-charcoal/15 py-4 text-charcoal text-[14px] focus:border-pomegranate outline-none placeholder:text-charcoal/35 transition-colors font-light';

  const labelColor = darkMode ? 'text-white/65' : 'text-charcoal/65';

  return (
    <form onSubmit={onSubmit} className="w-full space-y-7" noValidate>
      <div className="grid md:grid-cols-2 gap-7">
        <Field id="contact-name" label="Ad Soyad *" darkMode={darkMode}>
          <input required id="contact-name" name="name" value={form.name} onChange={onChange} placeholder="Adınız ve soyadınız" className={inputBase} />
        </Field>
        <Field id="contact-email" label="E-posta *" darkMode={darkMode}>
          <input required id="contact-email" type="email" name="email" value={form.email} onChange={onChange} placeholder="ornek@mail.com" className={inputBase} />
        </Field>
      </div>
      <Field id="contact-phone" label="Telefon *" darkMode={darkMode}>
        <input required id="contact-phone" name="phone" value={form.phone} onChange={onChange} placeholder="05xx xxx xx xx" className={inputBase} />
      </Field>
      <Field id="contact-message" label="Mesaj *" darkMode={darkMode}>
        <textarea required id="contact-message" name="message" value={form.message} onChange={onChange} placeholder="Mesajınızı yazın" rows={4} className={inputBase + ' resize-none'} />
      </Field>

      <KvkkConsentCheckbox
        checked={kvkkAccepted}
        onChange={setKvkkAccepted}
        policyBasePath={policyBasePath}
        darkMode={darkMode}
      />

      <div className="grid md:grid-cols-2 gap-7 items-end pt-2">
        <div className={`${labelColor} text-[13px] font-light`}>
          <label htmlFor="contact-captcha">Doğrulama sorusu *</label>
          <p className="mt-1">
            <span className="font-medium text-pomegranate-light">{captcha.a} + {captcha.b} = ?</span>
          </p>
        </div>
        <Field id="contact-captcha" label="Cevap *" darkMode={darkMode}>
          <input required id="contact-captcha" name="captcha" value={form.captcha} onChange={onChange} placeholder="Sonucu girin" className={inputBase} />
        </Field>
      </div>

      <motion.button
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
        type="submit"
        disabled={submitting}
        className={`group inline-flex items-center justify-center gap-3 w-full md:w-auto px-12 py-4 mt-4 tracking-[0.3em] text-[11px] uppercase font-medium transition-colors duration-300 disabled:opacity-60 ${
          darkMode
            ? 'bg-pomegranate-light text-white hover:bg-white hover:text-charcoal'
            : 'bg-pomegranate text-white hover:bg-charcoal'
        }`}
      >
        {submitting ? 'Gönderiliyor...' : (
          <>
            <span>Gönder</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </>
        )}
      </motion.button>

      {status === 'success' && (
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="status"
          className="text-pomegranate-light text-sm font-light">Mesajınızı Aldık · Teşekkür ederiz.</motion.p>
      )}
      {status === 'error' && (
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="alert"
          className="text-pomegranate-light text-sm font-light">Doğrulama hatası. Lütfen captcha cevabınızı kontrol edin.</motion.p>
      )}
      {status === 'failed' && (
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="alert"
          className="text-pomegranate-light text-sm font-light">Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin veya telefon ile ulaşın.</motion.p>
      )}
      {status === 'consent' && (
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="alert"
          className="text-pomegranate-light text-sm font-light">Devam etmek için KVKK aydınlatma metnini onaylamanız gerekmektedir.</motion.p>
      )}
      {status === 'config' && (
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="alert"
          className="text-pomegranate-light text-sm font-light">Form servisi yapılandırılmamış. Lütfen doğrudan e-posta veya telefon ile iletişime geçin.</motion.p>
      )}
    </form>
  );
}
