'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Importamos el hook
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';

export default function About() {
  const { t } = useTranslation(); // Usamos el hook para obtener las traducciones
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { triggerOnce: false, threshold: 0.85 });

  return (
    <section
      id="about"
      className="w-full px-6 md:px-12 py-24 flex justify-center bg-zinc-50"
    >
      {/* Contenedor principal con sombreado mejorado */}
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
          >
            {/* Traducción con animación */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('about.title')}
            </motion.span>
          </Heading>
        </motion.div>

        {/* Párrafos animados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          key={inView ? 'visible-text' : 'hidden-text'}
        >
          <Paragraph className="max-w-2xl mx-auto text-codiva-secondary text-lg mb-4">
            {/* Traducción estática antes de la animación */}
            {t('about.paragraph1Part1')}
            {/* Animación de "Codiva" */}
            <motion.span
              key="codiva"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block font-semibold text-zinc-900"
            >
              Codiva
            </motion.span>
            {/* Animación de ".dev" */}
            <motion.span
              key="dev"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-block text-codiva-primary"
            >
              .dev
            </motion.span>
            {/* Traducción estática después de la animación */}
            {t('about.paragraph1Part2')}
          </Paragraph>

          <Paragraph className="max-w-2xl mx-auto text-zinc-600 text-base">
            {/* Traducción estática antes de la animación */}
            {t('about.paragraph2Part1')}
            {/* Animación de "Codiva" */}
            <motion.span
              key="codiva"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block font-semibold text-zinc-900"
            >
              Codiva
            </motion.span>
            {/* Animación de ".dev" */}
            <motion.span
              key="dev"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-block text-codiva-primary"
            >
              .dev
            </motion.span>
            {/* Traducción estática después de la animación */}
            {t('about.paragraph2Part2')}
          </Paragraph>
        </motion.div>
      </div>
    </section>
  );
}