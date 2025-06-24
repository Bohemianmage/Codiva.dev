'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Heading from '../components/Heading';
import casesMeta from '../utils/casesMeta'; // Asegúrate que exista y esté correcto

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function CaseStudies() {
  const { t } = useTranslation();
  const [hoveredProject, setHoveredProject] = useState(null);
  const logoContainerRef = useRef(null);
  const techContainerRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const logos = useMemo(() => shuffleArray(casesMeta), []);
  const techs = useMemo(() => {
    const techSet = new Set();
    casesMeta.forEach(p => p.tech.forEach(t => techSet.add(t)));
    return shuffleArray([...techSet]);
  }, []);

  // Centrado automático
  useEffect(() => {
    const calcOffset = (ref) => {
      const el = ref.current;
      if (!el) return;
      const totalWidth = el.scrollWidth / 2;
      const visibleWidth = el.parentElement.offsetWidth;
      const offset = (visibleWidth - totalWidth) / 2;
      el.style.setProperty('--scroll-offset', `${offset}px`);
    };

    calcOffset(logoContainerRef);
    calcOffset(techContainerRef);

    const handleResize = () => {
      calcOffset(logoContainerRef);
      calcOffset(techContainerRef);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hover automático en móvil
  useEffect(() => {
    if (!isMobile) return;
    let i = 0;
    const interval = setInterval(() => {
      setHoveredProject(logos[i % logos.length]?.name);
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, [isMobile, logos]);

  return (
    <section
      id="casos"
      className="section-spacing w-full px-6 md:px-12 flex justify-center bg-zinc-50"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg px-8 py-12 text-center"
      >
        {/* Título */}
        <Heading
          as="h2"
          size="text-3xl md:text-4xl"
          className="text-codiva-primary mb-12"
        >
          {t('cases.title')}
        </Heading>

        {/* Carrusel de logos */}
        <div className="relative w-full overflow-hidden px-2 sm:px-8 mb-10">
          <div
            ref={logoContainerRef}
            className="
              flex gap-6 sm:gap-10 md:gap-14 whitespace-nowrap min-w-max
              animate-scroll-right animate-slow sm:animate-medium lg:animate-fast pb-6 pt-6
            "
            style={{ transform: 'translateX(var(--scroll-offset, -25%))' }}
          >
            {[...logos, ...logos].map((item, index) => (
              <a
                key={`logo-${index}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => !isMobile && setHoveredProject(item.name)}
                onMouseLeave={() => !isMobile && setHoveredProject(null)}
                className="flex-shrink-0"
                aria-label={`Go to ${item.name} project`}
              >
                <img
                  src={item.logo}
                  alt={`${item.name} logo`}
                  className={`h-12 sm:h-16 md:h-20 transition-all duration-300 ${
                    hoveredProject === item.name
                      ? 'scale-110 drop-shadow-lg'
                      : 'opacity-60 md:opacity-100'
                  }`}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Carrusel de tecnologías */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={techContainerRef}
            className="
              flex gap-4 whitespace-nowrap min-w-max
              animate-scroll-left animate-slow sm:animate-medium lg:animate-fast
            "
            style={{ transform: 'translateX(var(--scroll-offset, -25%))' }}
          >
            {[...techs, ...techs].map((tech, i) => {
              const isHighlighted = hoveredProject
                ? casesMeta.find(c => c.name === hoveredProject)?.tech.includes(tech)
                : false;

              return (
                <span
                  key={`tech-${i}`}
                  className={`px-3 py-1 border text-sm rounded-full whitespace-nowrap flex-shrink-0 transition-all duration-300 ease-in-out ${
                    isHighlighted
                      ? 'bg-codiva-primary text-white border-codiva-primary'
                      : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                  }`}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}