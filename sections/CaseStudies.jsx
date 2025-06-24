'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Heading from '../components/Heading';

const casesMeta = [
  {
    name: 'Inquilia',
    url: 'https://inquilia.com',
    logo: '/logos/inquilia.svg',
    tech: ['Next.js', 'i18n', 'Tailwind', 'Supabase', 'CryptoJS', 'AES-256', 'Formik', 'Yup', 'Vercel', 'Resend'],
  },
  {
    name: 'CD648',
    url: 'https://cd648.com',
    logo: '/logos/cd648.svg',
    tech: ['React', 'Stripe', 'i18n', 'Google Maps API', 'MongoDB', 'Express', 'Node.js', 'Framer Motion', 'Formik', 'Yup', 'Tailwind', 'Custom Hooks'],
  },
  {
    name: 'Quimialcla',
    url: 'https://quimialcla.vercel.app',
    logo: '/logos/quimialcla.svg',
    tech: ['React', 'Tailwind', 'i18n', 'Vercel', 'HTML/CSS', 'Responsive Design', 'Custom Hooks'],
  },
  {
    name: 'Morningstar',
    url: 'https://morningstar.com',
    logo: '/logos/morningstar.png',
    tech: ['Next.js', 'Tailwind', 'Contentful', 'Vercel', 'CI/CD', 'Design Systems'],
  },
];

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function CaseStudies() {
  const { t } = useTranslation();
  const [hoveredProject, setHoveredProject] = useState(null);
  const logoContainerRef = useRef(null);
  const techContainerRef = useRef(null);

  const logos = useMemo(() => shuffleArray(casesMeta), []);
  const techs = useMemo(() => {
    const techSet = new Set();
    casesMeta.forEach(p => p.tech.forEach(t => techSet.add(t)));
    return shuffleArray([...techSet]);
  }, []);

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

  return (
    <section
      id="casos"
      className="w-full px-6 md:px-12 py-20 md:py-24 flex justify-center bg-zinc-50"
    >
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg px-8 py-12 text-center">
        {/* Título con traducción */}
        <Heading
          as="h2"
          size="text-3xl md:text-4xl"
          className="text-codiva-primary mb-12"
        >
          {t('cases.title')}
        </Heading>

        {/* Carrusel de logos */}
        <div className="relative w-full overflow-hidden px-4 md:px-12 mb-10">
          <div
            ref={logoContainerRef}
            className="
              flex gap-8 sm:gap-14 md:gap-20 lg:gap-24 whitespace-nowrap min-w-max
              animate-scroll-right animate-slow sm:animate-medium lg:animate-fast
            "
            style={{ transform: 'translateX(var(--scroll-offset, -25%))' }}
          >
            {[...logos, ...logos].map((item, index) => (
              <a
                key={`logo-${index}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredProject(item.name)}
                onMouseLeave={() => setHoveredProject(null)}
                className="flex-shrink-0"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-16 md:h-20 lg:h-24 transition-all duration-300 hover:drop-shadow-md"
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
                  className={`px-3 py-1 border text-sm rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
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
      </div>
    </section>
  );
}