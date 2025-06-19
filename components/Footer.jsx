'use client';

import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full px-6 md:px-12 py-10 text-sm bg-zinc-900 border-t border-zinc-800 font-inter">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Créditos */}
        <span className="text-zinc-400 text-center md:text-left">
          © {new Date().getFullYear()}{' '}
          <span className="text-white font-medium">Codiva.dev</span>. All rights reserved.
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
    </footer>
  );
}