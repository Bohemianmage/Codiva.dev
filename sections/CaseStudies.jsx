'use client';

import { motion } from 'framer-motion';

export default function CaseStudies() {
  const cases = [
    {
      name: 'Inquilia',
      description:
        'A privacy-first PWA for document uploads, AES-256 encrypted and stored in Supabase. Designed for speed, clarity and ease of use.',
      tech: ['Next.js', 'Tailwind', 'Supabase', 'CryptoJS'],
    },
    {
      name: 'CD648',
      description:
        'A booking platform for a boutique hotel. Room availability, online payments, and live calendar with Google Maps integration.',
      tech: ['React', 'Stripe', 'i18n', 'Google Maps API'],
    },
  ];

  return (
    <section
      id="casos"
      className="w-full px-6 md:px-12 py-24 flex justify-center bg-transparent"
    >
      <div className="w-full max-w-5xl bg-white rounded-xl px-6 md:px-12 py-12 shadow-sm">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-zinc-900 mb-12 text-center"
        >
          Case Studies
        </motion.h2>

        <div className="space-y-10">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white border border-zinc-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-zinc-900 mb-2">
                {item.name}
              </h3>
              <p className="text-zinc-600 text-base mb-4 leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-sm bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full border border-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}