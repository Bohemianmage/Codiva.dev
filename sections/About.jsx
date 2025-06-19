'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
      className="w-full px-6 md:px-12 py-24 flex justify-center bg-transparent"
    >
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm px-8 py-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6"
        >
          About
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-codiva-secondary text-lg leading-relaxed"
        >
          I turn ideas into structured digital solutions.
          <br className="hidden md:block" />
          I develop web projects and SaaS for those who need clarity,
          efficiency, and real technical partnership.
        </motion.p>
      </div>
    </section>
  );
}