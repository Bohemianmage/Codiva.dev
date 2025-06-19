'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-codiva-background"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-bold text-zinc-900 leading-tight mb-6"
      >
        Clean code.{' '}
        <span className="text-codiva-primary">Custom tech.</span>
        <br />
        Without the agency noise.
      </motion.h1>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        onClick={() => {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="bg-codiva-primary text-white px-6 py-3 rounded-md hover:bg-[#0c3e3e] transition"
      >
        View services
      </motion.button>
    </section>
  );
}