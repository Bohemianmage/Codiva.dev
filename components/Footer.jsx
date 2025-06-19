'use client';

import { Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Footer() {
  const { t } = useTranslation();
  const footerRef = useRef(null);
  const inView = useInView(footerRef, { triggerOnce: false, threshold: 0.4 });

  return (
    <motion.footer
      ref={footerRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full px-6 md:px-12 py-10 text-sm bg-zinc-900 border-t border-zinc-800 font-inter"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Créditos */}
        <span className="text-zinc-400 text-center md:text-left">
          © {new Date().getFullYear()}{' '}
          <span className="text-white font-medium">Codiva.dev</span>. {t('footer.rights')}
        </span>

        {/* Contacto + redes */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <a
            href="mailto:hello@codiva.dev"
            className="text-codiva-primary hover:text-white font-medium transition-colors"
          >
            hello@codiva.dev
          </a>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Bohemianmage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/jcmartell/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
