import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Heading from '../components/Heading';
import casesMeta from '../utils/casesMeta';
import TechProjectNetwork from '../components/TechProjectNetwork';

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function CaseStudies() {
  const { t } = useTranslation();
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [logos, setLogos] = useState([]);
  const [techs, setTechs] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setLogos(shuffleArray(casesMeta));
  }, []);

  useEffect(() => {
    const techSet = new Set();
    casesMeta.forEach(p => p.tech.forEach(t => techSet.add(t)));
    setTechs(shuffleArray([...techSet]));
  }, []);

  useEffect(() => {
    if (!isMobile || logos.length === 0) return;
    let i = 0;
    const interval = setInterval(() => {
      setHoveredProject(logos[i % logos.length]?.name);
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, [isMobile, logos]);

  const defaultProject = logos[0]?.name;
  const activeProject = hoveredProject || (isMobile ? defaultProject : null);

  if (logos.length === 0 || techs.length === 0) return null;

  return (
    <section
      id="casos"
      className="section-spacing w-full px-6 md:px-12 flex flex-col items-center bg-zinc-50"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg px-8 py-12 text-center mb-12"
      >
        <Heading
          as="h2"
          id="casos"
          size="text-3xl md:text-4xl"
          className="text-codiva-primary mb-12"
        >
          {t('cases.title')}
        </Heading>

        {isMobile ? (
          <>
            <div className="relative w-full overflow-x-auto scrollbar-hidden px-2 sm:px-8 mb-10">
              <div className="flex gap-6 sm:gap-10 md:gap-14 whitespace-nowrap min-w-max animate-scroll-right animate-slow sm:animate-medium lg:animate-fast pb-6 pt-6">
                {[...logos, ...logos].map((item, index) => (
                  <a
                    key={`logo-${index}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredProject(item.name)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ height: '6rem', minWidth: '6rem' }}
                    aria-label={`Go to ${item.name} project`}
                  >
                    <img
                      src={item.logo}
                      alt={`${item.name} logo`}
                      className={`h-full w-auto object-contain transition-all duration-300 ${
                        activeProject === item.name ? 'scale-110 drop-shadow-lg' : 'opacity-60 md:opacity-100'
                      }`}
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="relative w-full overflow-x-auto scrollbar-hidden">
              <div className="flex gap-4 whitespace-nowrap min-w-max animate-scroll-left animate-slow sm:animate-medium lg:animate-fast">
                {[...techs, ...techs].map((tech, i) => {
                  const isHighlighted = activeProject
                    ? casesMeta.find(c => c.name === activeProject)?.tech.includes(tech)
                    : false;

                  return (
                    <span
                      key={`tech-${i}`}
                      role="listitem"
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={`px-3 py-1 border text-sm rounded-full whitespace-nowrap flex-shrink-0 cursor-pointer transition-all duration-300 ease-in-out ${
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
          </>
        ) : (
          <div className="mt-12">
            <TechProjectNetwork hoveredProject={hoveredProject} hoveredTech={hoveredTech} />
          </div>
        )}
      </motion.div>
    </section>
  );
}