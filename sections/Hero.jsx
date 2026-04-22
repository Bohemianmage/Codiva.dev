'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import Heading from '../components/Heading';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t, i18n } = useTranslation();

  // Textos traducidos
  const staticText1 = t('hero.cleanCode');
  const staticText2 = t('hero.withoutNoise');
  const fullText = t('hero.customTech') || '...'; // Fallback en caso de que no cargue i18n a tiempo

  const [typedText, setTypedText] = useState('');
  const [typedIndex, setTypedIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const heroRef = useRef(null);

  // Umbral reducido para asegurar disparo en pantallas chicas/móvil
  const isInView = useInView(heroRef, { threshold: 0.1 });

  /**
   * Al montar el componente, iniciar animación
   */
  useEffect(() => {
    setTypedText('');
    setTypedIndex(0);
    setDone(false);
    setAnimationKey((prev) => prev + 1);
  }, []);

  /**
   * Reinicia la animación cuando el Hero entra en vista (scroll up/down)
   */
  useEffect(() => {
    if (isInView) {
      setTypedText('');
      setTypedIndex(0);
      setDone(false);
      setAnimationKey((prev) => prev + 1);
    }
  }, [isInView]);

  /**
   * Mecanografiado letra por letra
   */
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

  /**
   * Reinicia al cambiar de idioma
   */
  useEffect(() => {
    if (i18n.isInitialized) {
      setTypedText('');
      setTypedIndex(0);
      setDone(false);
      setAnimationKey((prev) => prev + 1);
    }
  }, [i18n.language, i18n.isInitialized]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="flex min-h-screen flex-col items-center justify-center bg-codiva-background px-6 pb-10 pt-[max(6rem,env(safe-area-inset-top,0px)+4.5rem)] text-center md:pt-[max(6.5rem,env(safe-area-inset-top,0px)+4.5rem)]"
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