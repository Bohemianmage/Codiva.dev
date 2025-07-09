'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { Sling as Hamburger } from 'hamburger-react';
import { useRouter, usePathname } from 'next/navigation';

// Menú de navegación (ya sin 'Home')
const navItems = [
  { labelKey: 'nav.about', id: 'about' },
  { labelKey: 'nav.services', id: 'services' },
  { labelKey: 'nav.cases', id: 'casos' },
  { labelKey: 'nav.contact', id: 'contact' },
];

// Animaciones del navbar
const navVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.03 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0 },
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { t } = useTranslation();

  /**
   * Navega a la sección correspondiente.
   * Si estamos fuera de '/', redirige con hash.
   * Si estamos en '/', hace scroll suave.
   */
  const scrollTo = (id) => {
    if (pathname !== '/') {
      router.push(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  // Mostrar u ocultar navbar según el scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY <= 80 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Cerrar menú con Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -80 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full fixed top-0 z-50 bg-white border-b border-[#6A757A33] px-6 md:px-12 py-4 font-inter"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo principal (click lleva al inicio) */}
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

        {/* Navegación desktop */}
        <div className="hidden md:flex items-center justify-between gap-6">
          <motion.div
            className="flex gap-12"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map(({ labelKey, id }) => (
              <motion.button
                key={id}
                variants={itemVariants}
                onClick={() => scrollTo(id)}
                className="relative text-codiva-secondary hover:text-zinc-900 transition-colors font-medium after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:bg-codiva-primary after:w-0 hover:after:w-full after:transition-all"
              >
                {t(labelKey)}
              </motion.button>
            ))}
          </motion.div>

          <div className="pl-4">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile: idioma + hamburguesa */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Hamburger toggled={menuOpen} toggle={setMenuOpen} size={20} color="#1E293B" />
          </button>
        </div>
      </div>

      {/* Menú mobile + backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Fondo clickeable para cerrar */}
            <motion.div
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menú móvil */}
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, scale: 0.98, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed top-[72px] left-0 right-0 z-50 px-6 pb-6 bg-white"
            >
              <motion.div
                variants={navVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-4"
              >
                {navItems.map(({ labelKey, id }) => (
                  <motion.button
                    key={id}
                    variants={itemVariants}
                    onClick={() => scrollTo(id)}
                    className="block w-full text-left text-codiva-secondary hover:text-zinc-900 transition font-medium"
                  >
                    {t(labelKey)}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}