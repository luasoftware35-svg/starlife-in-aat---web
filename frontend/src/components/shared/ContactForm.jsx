import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

function generateCaptcha() {
  const a = Math.floor(Math.random() * 8) + 1;
  const b = Math.floor(Math.random() * 8) + 1;
  return { a, b, answer: a + b };
}

export default function ContactForm({ darkMode = true }) {
  // Lazy state initializer: captcha is computed once on mount and remains stable.
  const [captcha] = useState(generateCaptcha);

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', captcha: '' });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      if (Number(form.captcha) !== captcha.answer) {
        setStatus('error');
      } else {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '', captcha: '' });
      }
      setSubmitting(false);
    }, 700);
  };

  const inputBase = darkMode
    ? 'w-full bg-transparent border-b border-white/25 py-3 text-white text-sm focus:border-gold outline-none placeholder:text-white/30 transition-colors'
    : 'w-full bg-transparent border-b border-black/15 py-3 text-dark text-sm focus:border-gold outline-none placeholder:text-black/30 transition-colors';

  return (
    <form onSubmit={onSubmit} className="w-full space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <input required name="name" value={form.name} onChange={onChange} placeholder="Ad Soyad *" className={inputBase} />
        <input required type="email" name="email" value={form.email} onChange={onChange} placeholder="Mail Adresiniz *" className={inputBase} />
      </div>
      <input required name="phone" value={form.phone} onChange={onChange} placeholder="Telefon *" className={inputBase} />
      <textarea required name="message" value={form.message} onChange={onChange} placeholder="Mesajınız *" rows={4} className={inputBase + ' resize-none'} />

      <div className="grid md:grid-cols-2 gap-5 items-center">
        <div className={darkMode ? 'text-white/70 text-sm' : 'text-dark/70 text-sm'}>
          Soru *: <span className="font-semibold">{captcha.a} + {captcha.b} = ?</span>
        </div>
        <input required name="captcha" value={form.captcha} onChange={onChange} placeholder="Cevap *" className={inputBase} />
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={submitting}
        className="bg-gold text-black font-bold px-10 py-4 mt-2 w-full hover:bg-white transition-colors duration-300 flex items-center justify-center gap-3 tracking-widest text-sm uppercase disabled:opacity-60"
      >
        {submitting ? 'Gönderiliyor...' : (<><span>Gönder</span> <Send size={16} /></>)}
      </motion.button>

      {status === 'success' && <p className="text-gold text-sm mt-2">Mesajınızı Aldık</p>}
      {status === 'error' && <p className="text-red-400 text-sm mt-2">Hata! Tekrar Deneyin</p>}
    </form>
  );
}
