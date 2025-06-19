'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Heading from './Heading';
import Paragraph from './Paragraph';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollUp, setScrollUp] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current < lastScroll) setScrollUp(true);
      else if (current > lastScroll + 10) setScrollUp(false);
      setLastScroll(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  const navItems = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Sobre mí', id: 'about' },
    { label: 'Servicios', id: 'services' },
    { label: 'Proyectos', id: 'casos' },
    { label: 'Contacto', id: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: scrollUp ? 0 : -100 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full fixed top-0 z-50 bg-white border-b border-[#6A757A33] px-6 md:px-12 py-4 shadow-sm backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo con animación */}
        <motion.div
          onClick={() => scrollTo('hero')}
          className="flex items-center space-x-2 cursor-pointer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Image src="/logo.svg" alt="Codiva logo" width={28} height={28} />
          <Heading
            as="div"
            size="text-xl"
            className="text-zinc-900 tracking-tight flex items-baseline gap-1"
          >
            Codiva
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="text-base text-codiva-primary font-medium relative"
            >
              .dev
            </motion.span>
          </Heading>
        </motion.div>

        {/* Desktop nav */}
        <motion.div
          className="hidden md:flex gap-12"
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          {navItems.map(({ label, id }) => (
            <motion.button
              key={id}
              variants={itemVariants}
              onClick={() => scrollTo(id)}
              className="text-codiva-secondary hover:text-zinc-900 hover:underline underline-offset-4 transition-colors font-medium"
            >
              {label}
            </motion.button>
          ))}
        </motion.div>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="text-zinc-700 hover:text-zinc-900 transition"
          >
            <motion.div
              key={menuOpen ? 'close' : 'open'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden mt-4 px-6 space-y-4 pb-6"
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {navItems.map(({ label, id }) => (
              <motion.button
                key={id}
                variants={itemVariants}
                onClick={() => scrollTo(id)}
                className="block w-full text-left text-codiva-secondary hover:text-zinc-900 transition font-medium"
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}