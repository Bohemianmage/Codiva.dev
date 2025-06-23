'use client';

import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Code2,
  Settings,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from 'lucide-react';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';

const ICONS = [
  <Globe className="w-5 h-5 text-codiva-primary" />,
  <Code2 className="w-5 h-5 text-codiva-primary" />,
  <Settings className="w-5 h-5 text-codiva-primary" />,
];

export default function Services() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [expandedIndex, setExpandedIndex] = useState(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { triggerOnce: false, threshold: 0.6 });
  const services = t('services.list', { returnObjects: true });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full px-6 md:px-12 py-24 flex justify-center bg-zinc-50"
    >
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md px-6 md:px-12 py-12 text-center">
        {/* Título animado */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <Heading
            as="h2"
            size="text-3xl md:text-4xl"
            className="text-codiva-primary mb-12"
          >
            {t('services.title')}
          </Heading>
        </motion.div>

        {/* Tarjetas de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {services.map((service, index) => {
            const isExpanded = expandedIndex === index;
            const detailsId = `service-details-${index}`;
            const price = currentLang === 'es'
              ? ['Desde $12,000 MXN', 'Desde $30,000 MXN', 'Desde $8,000 MXN/mes'][index]
              : ['From $700 USD', 'From $1,750 USD', 'From $470 USD/month'][index];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative border ${
                  service.badge ? 'border-codiva-primary/30 bg-codiva-primary/5' : 'border-zinc-100'
                } rounded-xl p-6 shadow-sm hover:shadow-md hover:scale-[1.015] transition-transform duration-300 flex flex-col justify-between`}
              >
                {/* Badge destacado refinado para desktop y mobile */}
                {service.badge && (
                  <span className="text-[11px] md:text-xs font-medium text-white bg-codiva-primary px-3 py-1 rounded-full absolute -top-2 -right-2 shadow-sm">
                    {service.badge}
                  </span>
                )}

                <div>
                  {/* Título del servicio con ícono */}
                  <h3 className="text-zinc-900 font-semibold text-xl mb-2 flex items-center gap-2">
                    {ICONS[index]}
                    {service.title}
                  </h3>

                  <Paragraph className="text-zinc-700 text-base mb-2">
                    {service.description}
                  </Paragraph>
                </div>

                <div className="mt-4">
                  {/* Precio (visible y legible para SEO) */}
                  <p
                    className="text-base text-codiva-primary font-semibold mb-3"
                    data-price={price}
                  >
                    {price}
                  </p>

                  {/* Botón de expansión accesible */}
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    aria-expanded={isExpanded}
                    aria-controls={detailsId}
                    className="flex items-center gap-1 text-sm text-zinc-600 hover:text-codiva-primary transition"
                  >
                    {isExpanded ? (
                      <>
                        {t('services.button.hide')}
                        <motion.div animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                          <ChevronUp className="w-4 h-4" />
                        </motion.div>
                      </>
                    ) : (
                      <>
                        {t('services.button.show')}
                        <motion.div animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </>
                    )}
                  </button>

                  {/* Desglose animado */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.ul
                        id={detailsId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pl-1 space-y-2"
                      >
                        {service.details.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-zinc-600"
                          >
                            <CheckCircle className="w-4 h-4 text-codiva-primary mt-[2px]" />
                            {item}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
