'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { label: 'Inicio', id: 'hero' },
  { label: 'Sobre mí', id: 'about' },
  { label: 'Servicios', id: 'services' },
  { label: 'Proyectos', id: 'casos' },
  { label: 'Contacto', id: 'contact' },
];

const navVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0 },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className="w-full fixed top-0 z-50 bg-white border-b border-[#6A757A33] px-6 md:px-12 py-4 font-inter">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo animado */}
        <motion.div
          onClick={() => scrollTo('hero')}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Image src="/logo.svg" alt="Codiva logo" width={28} height={28} />
          <div className="text-xl font-bold tracking-tight text-zinc-900 font-satoshi flex items-end">
            Codiva
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3, ease: 'easeOut' }}
              className="text-base ml-1 text-codiva-primary font-medium"
            >
              .dev
            </motion.span>
          </div>
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center justify-between gap-6">
          <motion.div
            className="flex gap-12"
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

          <div className="pl-4">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            <svg
              className="w-6 h-6 text-zinc-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden mt-4 px-6 pb-6"
          >
            {/* Idioma */}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="mb-4"
            >
              <LanguageSwitcher />
            </motion.div>

            {/* Botones animados */}
            <motion.div
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-4"
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}