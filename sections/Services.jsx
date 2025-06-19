'use client';

import { motion } from 'framer-motion';
import { Globe, Code2, Settings } from 'lucide-react';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';

export default function Services() {
  const services = [
    {
      icon: <Globe className="w-5 h-5 text-codiva-primary" />,
      title: 'Web Essentials',
      description:
        'Informational websites, landing pages, bespoke digital branding.',
    },
    {
      icon: <Code2 className="w-5 h-5 text-codiva-primary" />,
      title: 'Apps & Systems',
      description:
        'Tailored development, frontend and backend, SaaS platforms.',
    },
    {
      icon: <Settings className="w-5 h-5 text-codiva-primary" />,
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
        {/* Título de sección */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Heading
            as="h2"
            size="text-3xl md:text-4xl"
            className="text-codiva-primary mb-12"
          >
            Services
          </Heading>
        </motion.div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {services.map(({ icon, title, description }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="border border-zinc-100 bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:scale-[1.015] transition-transform duration-300"
            >
              <Heading
                as="h3"
                size="text-xl"
                className="text-zinc-900 font-semibold mb-2 flex items-center gap-2"
              >
                {icon}
                {title}
              </Heading>
              <Paragraph className="text-zinc-700 text-base">
                {description}
              </Paragraph>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}