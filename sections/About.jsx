'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';

export default function About() {
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
        className="w-full max-w-4xl bg-white rounded-xl shadow-md px-8 py-12 text-center"
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
            Transforming vision into technical clarity
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
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block font-semibold text-zinc-900"
            >
              Codiva
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-block text-codiva-primary"
            >
              .dev
            </motion.span>{' '}
            helps teams and founders build structured, scalable digital products.
            From idea to architecture, we turn complexity into elegant, technical execution.
          </Paragraph>

          <Paragraph className="max-w-2xl mx-auto text-zinc-600 text-base">
            Whether you need a tailored web platform, a SaaS MVP, or a reliable technical partner,{' '}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block font-semibold text-zinc-900"
            >
              Codiva
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-block text-codiva-primary"
            >
              .dev
            </motion.span>{' '}
            offers the clarity and precision needed to move fast and build right.
          </Paragraph>
        </motion.div>
      </div>
    </section>
  );
}