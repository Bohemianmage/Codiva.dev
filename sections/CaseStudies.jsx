'use client';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';

const casesMeta = [
  {
    name: 'Inquilia',
    year: '2024',
    url: 'https://inquilia.com',
    tech: ['Next.js', 'Tailwind', 'Supabase', 'CryptoJS'],
  },
  {
    name: 'CD648',
    year: '2024',
    url: 'https://cd648.com',
    tech: ['React', 'Stripe', 'i18n', 'Google Maps API'],
  },
  {
    name: 'Quimialcla',
    year: '2025',
    url: 'https://quimialcla.vercel.app',
    tech: ['React', 'Tailwind', 'i18n', 'Vercel'],
  },
];

export default function CaseStudies() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { triggerOnce: false, threshold: 0.6 });
  const { t } = useTranslation();
  const cases = t('cases.list', { returnObjects: true });

  return (
    <section
      id="casos"
      ref={sectionRef}
      aria-labelledby="case-studies-heading"
      className="w-full px-4 sm:px-6 md:px-12 py-24 flex justify-center bg-zinc-50"
    >
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md px-4 sm:px-6 md:px-12 py-12">
        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <Heading
            as="h2"
            id="case-studies-heading"
            size="text-3xl md:text-4xl"
            className="text-codiva-primary text-center mb-8"
          >
            {t('cases.title')}
          </Heading>
        </motion.div>

        {/* Lista de casos */}
        <div className="space-y-10">
          {casesMeta.map((meta, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white border border-zinc-100 hover:border-codiva-primary/40 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all hover:translate-y-1"
              aria-label={`Case study: ${meta.name}`}
            >
              {/* Vista previa del sitio */}
              <div className="rounded-lg overflow-hidden mb-4 border border-zinc-200 shadow aspect-video">
                <iframe
                  src={meta.url}
                  loading="lazy"
                  title={`Preview of ${meta.name}`}
                  aria-label={`Preview iframe of ${meta.name}`}
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Encabezado con nombre, año y enlace */}
              <Heading
                as="h3"
                size="text-lg sm:text-xl md:text-2xl"
                className="text-zinc-900 font-semibold tracking-tight mb-2 flex flex-wrap items-center gap-2"
              >
                <a
                  href={meta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Visit ${meta.name}`}
                  className="hover:underline text-zinc-800 hover:text-codiva-primary transition-colors"
                >
                  {meta.name}
                </a>
                <span className="text-sm text-zinc-400 font-normal">· {meta.year}</span>
                <ExternalLink className="w-4 h-4 text-zinc-400" aria-hidden="true" />
              </Heading>

              {/* Descripción traducida */}
              <Paragraph className="text-zinc-600 text-base mb-4">
                {cases[index].description}
              </Paragraph>

              {/* Badges de tecnología */}
              <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                {meta.tech.map((tech, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-sm bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full border border-zinc-200 transition-transform"
                  >
                    {tech}
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}