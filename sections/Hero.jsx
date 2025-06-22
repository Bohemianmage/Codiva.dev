'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import Heading from '../components/Heading';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t, i18n } = useTranslation();  // Acceso a las traducciones y el cambio de idioma

  // Definir los textos estáticos y dinámicos
  const staticText1 = t('hero.cleanCode');  // "Clean code."
  const staticText2 = t('hero.withoutNoise');  // "Without the agency noise."

  const fullText = t('hero.customTech');  // Traducción para el texto animado (ejemplo "Custom tech." o "Tecnología a la medida.")
  
  const [typedText, setTypedText] = useState('');
  const [typedIndex, setTypedIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { threshold: 0.6 });

  // Reinicia animaciones al entrar en la sección
  useEffect(() => {
    if (isInView) {
      setTypedText('');
      setTypedIndex(0);
      setDone(false);
      setAnimationKey((prev) => prev + 1);  // Fuerza un remount
    }
  }, [isInView]);

  // Lógica de mecanografiado
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

  // Detectar cuando cambia el idioma y reiniciar la animación
  useEffect(() => {
    setTypedText('');
    setTypedIndex(0);
    setDone(false);
    setAnimationKey((prev) => prev + 1);  // Reiniciar animación cuando cambie el idioma
  }, [i18n.language]);  // Esto se dispara cuando el idioma cambia

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-codiva-background"
    >
      <motion.div
        key={animationKey} // 🔁 Fuerza remount del bloque
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
      </motion.div>

      <motion.button
        key={`btn-${animationKey}`} // 🔁 también reinicia animación del botón
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