'use client';

import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      title: 'Web Essentials',
      description:
        'Informational websites, landing pages, bespoke digital branding.',
    },
    {
      title: 'Apps & Systems',
      description:
        'Tailored development, frontend and backend, SaaS platforms.',
    },
    {
      title: 'CTO-as-a-service',
      description:
        'Ongoing support, product evolution, technical maintenance.',
    },
  ];

  return (
    <section
      id="services"
      className="w-full px-6 md:px-12 py-24 flex justify-center bg-transparent"
    >
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-sm px-6 md:px-12 py-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-zinc-900 mb-12"
        >
          Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(({ title, description }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="border border-zinc-100 bg-white rounded-xl p-6 text-left shadow-sm hover:shadow-md hover:scale-[1.015] transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                → {title}
              </h3>
              <p className="text-zinc-600 text-base">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}