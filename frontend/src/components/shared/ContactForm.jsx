import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import KvkkConsentCheckbox from './KvkkConsentCheckbox';

function generateCaptcha() {
  const a = Math.floor(Math.random() * 8) + 1;
  const b = Math.floor(Math.random() * 8) + 1;
  return { a, b, answer: a + b };
}

export default function ContactForm({ darkMode = true, policyBasePath = '' }) {
  const [captcha] = useState(generateCaptcha);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', captcha: '' });
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!kvkkAccepted) {
      setStatus('consent');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      if (Number(form.captcha) !== captcha.answer) {
        setStatus('error');
      } else {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '', captcha: '' });
        setKvkkAccepted(false);
      }
      setSubmitting(false);
    }, 700);
  };

  const inputBase = darkMode
    ? 'w-full bg-transparent border-b border-white/20 py-4 text-white text-[14px] focus:border-pomegranate-light outline-none placeholder:text-white/35 transition-colors font-light'
    : 'w-full bg-transparent border-b border-charcoal/15 py-4 text-charcoal text-[14px] focus:border-pomegranate outline-none placeholder:text-charcoal/35 transition-colors font-light';

  const labelColor = darkMode ? 'text-white/65' : 'text-charcoal/65';

  return (
    <form onSubmit={onSubmit} className="w-full space-y-7" noValidate>
      <div className="grid md:grid-cols-2 gap-7">
        <input required name="name" value={form.name} onChange={onChange} placeholder="Ad Soyad *" aria-label="Ad Soyad" className={inputBase} />
        <input required type="email" name="email" value={form.email} onChange={onChange} placeholder="Mail Adresiniz *" aria-label="E-posta" className={inputBase} />
      </div>
      <input required name="phone" value={form.phone} onChange={onChange} placeholder="Telefon *" aria-label="Telefon" className={inputBase} />
      <textarea required name="message" value={form.message} onChange={onChange} placeholder="Mesajınız *" aria-label="Mesaj" rows={4} className={inputBase + ' resize-none'} />

      <KvkkConsentCheckbox
        checked={kvkkAccepted}
        onChange={setKvkkAccepted}
        policyBasePath={policyBasePath}
        darkMode={darkMode}
      />

      <div className="grid md:grid-cols-2 gap-7 items-center pt-2">
        <div className={`${labelColor} text-[13px] font-light`}>
          Soru *: <span className="font-medium text-pomegranate-light">{captcha.a} + {captcha.b} = ?</span>
        </div>
        <input required name="captcha" value={form.captcha} onChange={onChange} placeholder="Cevap *" aria-label="Doğrulama cevabı" className={inputBase} />
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
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </motion.button>

      {status === 'success' && (
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="text-pomegranate-light text-sm font-light">Mesajınızı Aldık · Teşekkür ederiz.</motion.p>
      )}
      {status === 'error' && (
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="text-pomegranate-light text-sm font-light">Doğrulama hatası. Lütfen captcha cevabınızı kontrol edin.</motion.p>
      )}
      {status === 'consent' && (
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="text-pomegranate-light text-sm font-light">Devam etmek için KVKK aydınlatma metnini onaylamanız gerekmektedir.</motion.p>
      )}
    </form>
  );
}
