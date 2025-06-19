'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';

export default function CaseStudies() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { triggerOnce: false, threshold: 0.6 });

  const cases = [
    {
      name: 'Inquilia',
      description:
        'A privacy-first PWA for document uploads, AES-256 encrypted and stored in Supabase. Designed for speed, clarity and ease of use.',
      tech: ['Next.js', 'Tailwind', 'Supabase', 'CryptoJS'],
      url: 'https://inquilia.com',
      year: '2024',
    },
    {
      name: 'CD648',
      description:
        'A booking platform for a boutique hotel. Room availability, online payments, and live calendar with Google Maps integration.',
      tech: ['React', 'Stripe', 'i18n', 'Google Maps API'],
      url: 'https://cd648.com',
      year: '2024',
    },
    {
      name: 'Morningstar',
      description:
        'An e-commerce experience for a holistic bracelet brand. Combines product storytelling, online orders, and service booking for wellness sessions.',
      tech: ['Next.js', 'Sanity', 'Tailwind', 'Calendly API'],
      url: 'https://morningstar.com',
      year: '2023',
    },
  ];

  return (
    <section
      id="casos"
      ref={sectionRef}
      className="w-full px-4 sm:px-6 md:px-12 py-24 flex justify-center bg-zinc-50"
    >
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md px-4 sm:px-6 md:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          key={inView ? 'title-in' : 'title-out'}
        >
          <Heading
            as="h2"
            size="text-3xl md:text-4xl"
            className="text-codiva-primary text-center mb-8"
          >
            Success Stories
          </Heading>
        </motion.div>

        <div className="space-y-10">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white border border-zinc-100 hover:border-codiva-primary/40 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all hover:translate-y-1"
            >
              <div className="rounded-lg overflow-hidden mb-4 border border-zinc-200 shadow aspect-video">
                <iframe
                  src={item.url}
                  loading="lazy"
                  title={`Preview of ${item.name}`}
                  className="w-full h-full"
                ></iframe>
              </div>

              <Heading
                as="h3"
                size="text-lg sm:text-xl md:text-2xl"
                className="text-zinc-900 font-semibold tracking-tight mb-2 flex flex-wrap items-center gap-2"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-zinc-800 hover:text-codiva-primary transition-colors"
                >
                  {item.name}
                </a>
                <span className="text-sm text-zinc-400 font-normal">· {item.year}</span>
                <ExternalLink className="w-4 h-4 text-zinc-400" />
              </Heading>

              <Paragraph className="text-zinc-600 text-base mb-4">
                {item.description}
              </Paragraph>

              <div className="flex flex-wrap gap-2">
                {item.tech.map((tech, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-sm bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full border border-zinc-200 transition-transform"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}