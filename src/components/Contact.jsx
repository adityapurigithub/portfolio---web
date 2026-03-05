import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import MagnetButton from './MagnetButton';
import { Mail, MapPin, Clock } from 'lucide-react';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const contactInfo = [
  { Icon: Mail,   label: 'Email', value: 'adityapuri85@gmail.com' },
  { Icon: MapPin, label: 'Location', value: 'India' },
  { Icon: Clock,  label: 'Response', value: 'Within 1 hours' },
];

export default function Contact() {
  const formRef = useRef(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [status, setStatus] = useState('idle');

  const onSubmit = async () => {
    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, { publicKey: EMAILJS_PUBLIC_KEY });
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputCls = 'w-full glass-input rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm';

  return (
    <section id="contact" className="py-20 relative overflow-hidden section-divider">
      {/* Orbs */}
      <div className="blob-glow bg-accent/25 w-[40vw] h-[40vw] bottom-0 left-[-10vw]" />
      <div className="blob-glow bg-primary-600/20 w-[30vw] h-[30vw] top-0 right-[-10vw]" style={{ animationDelay: '3s' }} />

      <div className="max-w-4xl mx-auto px-6 z-10 relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white/90">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-gray-500 text-lg">Have a project in mind? I'd love to hear about it.</p>
        </motion.div>

        {/* Info cards row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {contactInfo.map(({ Icon, label, value }) => (
            <div key={label} className="glass-panel rounded-xl p-4 flex items-center gap-4 group" data-cursor-hover>
              <div className="p-2.5 rounded-lg glass border border-primary-500/20 text-primary-400 group-hover:text-accent group-hover:border-accent/30 transition-colors duration-300">
                <Icon size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
                <p className="text-sm text-gray-300 font-medium">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          className="glass-panel rounded-[2rem] p-8 md:p-10 relative overflow-hidden"
        >
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
          {/* Inner gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-accent/5 pointer-events-none rounded-[2rem]" />

          {/* Status toasts */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                className="mb-6 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 rounded-xl px-5 py-4 text-sm font-medium backdrop-blur-sm"
              >
                <span className="text-xl">✅</span>
                Message sent! I'll get back to you soon.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/25 text-red-300 rounded-xl px-5 py-4 text-sm font-medium backdrop-blur-sm"
              >
                <span className="text-xl">❌</span>
                Something went wrong. Please try again.
              </motion.div>
            )}
          </AnimatePresence>

          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="relative z-10 flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary-400 ml-1">Name</label>
                <input
                  type="text"
                  {...register('user_name', { required: true })}
                  className={inputCls}
                  placeholder="Your Name..."
                />
                {errors.user_name && <span className="text-accent text-xs ml-1">Name is required</span>}
              </div>
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary-400 ml-1">Email</label>
                <input
                  type="email"
                  {...register('user_email', { required: true })}
                  className={inputCls}
                  placeholder="Your Email..."
                />
                {errors.user_email && <span className="text-accent text-xs ml-1">Email is required</span>}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-primary-400 ml-1">Message</label>
              <textarea
                rows="4"
                {...register('message', { required: true })}
                className={`${inputCls} resize-none`}
                placeholder="Type your message here…"
              />
              {errors.message && <span className="text-accent text-xs ml-1">Message is required</span>}
            </div>

            {/* Submit */}
            <div className="mt-1 flex justify-center md:justify-end">
              <MagnetButton
                type="submit"
                disabled={status === 'sending'}
                className="!w-full md:!w-auto bg-gradient-to-r from-primary-600 to-accent !border-none !text-white !px-10 py-3.5 shadow-[0_0_24px_rgba(217,70,239,0.3)] hover:shadow-[0_0_36px_rgba(217,70,239,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending…
                  </span>
                ) : 'Send Message'}
              </MagnetButton>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
