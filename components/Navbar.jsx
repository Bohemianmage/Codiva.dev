'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navItems = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Sobre mí', id: 'about' },
    { label: 'Servicios', id: 'services' },
    { label: 'Proyectos', id: 'casos' },
    { label: 'Contacto', id: 'contact' },
  ];

  return (
    <nav className="w-full fixed top-0 z-50 bg-white border-b border-codiva-muted px-6 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo y Marca */}
        <div
          onClick={() => scrollTo('hero')}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Image src="/logo.svg" alt="Codiva logo" width={28} height={28} />
          <div className="text-xl font-bold tracking-tight text-zinc-900">
            Codiva
            <span className="text-sm text-codiva-primary font-medium ml-1 align-super">
              .dev
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-codiva-secondary hover:text-zinc-900 transition-colors"
            >
              {label}
            </button>
          ))}
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
      {menuOpen && (
        <div className="md:hidden mt-4 px-6 space-y-4">
          {navItems.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="block w-full text-left text-codiva-secondary hover:text-zinc-900 transition"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}