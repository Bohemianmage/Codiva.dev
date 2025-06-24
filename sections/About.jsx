'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';

export default function About() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  // Animación siempre activa al entrar al viewport
  const inView = useInView(sectionRef, {
    triggerOnce: false,
    threshold: 0.85,
  });

  // Insertar "Codiva.dev" estilizado dentro de un texto
  const CodivaDev = () => (
    <>
      <motion.span
        key="codiva"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="inline-block font-semibold text-zinc-900"
      >
        Codiva
      </motion.span>
      <motion.span
        key="dev"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="inline-block text-codiva-primary"
      >
        .dev
      </motion.span>
    </>
  );

  return (
    <section
      id="about"
      className="section-spacing w-full px-6 md:px-12 flex justify-center bg-zinc-50"
    >
      <div
        ref={sectionRef}
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg px-8 py-12 text-center"
      >
        {/* Título animado */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          key={inView ? 'visible-title' : 'hidden-title'}
        >
          <Heading
            as="h2"
            size="text-3xl md:text-4xl"
            className="text-codiva-primary mb-6"
            role="heading"
            aria-level={2}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('about.title')}
            </motion.span>
          </Heading>

          {/* Fallback SEO */}
          <noscript>
            <h2 style={{ display: 'none' }}>{t('about.title')}</h2>
          </noscript>
        </motion.div>

        {/* Párrafos animados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          key={inView ? 'visible-text' : 'hidden-text'}
        >
          <Paragraph className="max-w-2xl mx-auto text-codiva-secondary text-base md:text-lg mb-4">
            {t('about.paragraph1').split('Codiva.dev')[0]}
            <CodivaDev />
            {t('about.paragraph1').split('Codiva.dev')[1]}
          </Paragraph>

          <Paragraph className="max-w-2xl mx-auto text-zinc-600 text-base md:text-lg">
            {t('about.paragraph2').split('Codiva.dev')[0]}
            <CodivaDev />
            {t('about.paragraph2').split('Codiva.dev')[1]}
          </Paragraph>
        </motion.div>
      </div>
    </section>
  );
}