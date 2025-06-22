'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import Heading from '../components/Heading';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t, i18n } = useTranslation();

  // Textos traducidos
  const staticText1 = t('hero.cleanCode');         // Ej. "Clean code."
  const staticText2 = t('hero.withoutNoise');      // Ej. "Without the agency noise."
  const fullText = t('hero.customTech');           // Ej. "Custom tech." o "Tecnología a la medida."

  const [typedText, setTypedText] = useState('');
  const [typedIndex, setTypedIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { threshold: 0.6 });

  // Reinicia la animación al entrar en vista
  useEffect(() => {
    if (isInView) {
      setTypedText('');
      setTypedIndex(0);
      setDone(false);
      setAnimationKey((prev) => prev + 1);
    }
  }, [isInView]);

  // Mecanografiado letra por letra
  useEffect(() => {
    if (typedIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[typedIndex]);
        setTypedIndex((prev) => prev + 1);
      }, 70);
      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [typedIndex, fullText]);

  // Reinicia al cambiar de idioma
  useEffect(() => {
    setTypedText('');
    setTypedIndex(0);
    setDone(false);
    setAnimationKey((prev) => prev + 1);
  }, [i18n.language]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-codiva-background"
    >
      {/* Encabezado principal animado */}
      <motion.div
        key={animationKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading
          as="h1"
          size="text-4xl md:text-6xl"
          className="text-zinc-900 leading-tight mb-6"
        >
          {staticText1}{' '}
          <span className="text-codiva-primary">
            {typedText}
            {!done && <span className="animate-pulse">|</span>}
          </span>
          <br />
          {staticText2}
        </Heading>

        {/* Fallback SEO para bots sin JS */}
        <noscript>
          <h1 style={{ display: 'none' }}>
            {staticText1} {fullText} {staticText2}
          </h1>
        </noscript>
      </motion.div>

      {/* Botón animado para scroll */}
      <motion.button
        key={`btn-${animationKey}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onClick={() => {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="bg-codiva-primary text-white px-6 py-3 rounded-2xl hover:bg-[#0c3e3e] transition"
      >
        {t('hero.viewServices')}
      </motion.button>
    </section>
  );
}