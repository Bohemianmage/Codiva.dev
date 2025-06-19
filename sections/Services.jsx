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

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { triggerOnce: false, threshold: 0.6 });

  const breakdowns = [
    [
      'Responsive custom design',
      '1–3 informational sections',
      'Basic CTA or contact form',
      'Initial SEO structure',
      'Multilanguage (optional)',
    ],
    [
      'Frontend & backend development',
      'Business logic & validations',
      'Encrypted file handling',
      'Stripe, Maps or mailing APIs',
      'Admin dashboard (optional)',
    ],
    [
      'Tech diagnosis & recommendations',
      '1–2 monthly strategic sessions',
      'Remote support',
      'Documentation & roadmap (optional)',
      'Task execution not included',
    ],
  ];

  const services = [
    {
      icon: <Globe className="w-5 h-5 text-codiva-primary" />,
      title: 'Web Essentials',
      description: 'Informational websites, landing pages, bespoke digital branding.',
      priceMXN: 'From $12,000 MXN',
      priceUSD: 'From $700 USD',
      highlight: false,
    },
    {
      icon: <Code2 className="w-5 h-5 text-codiva-primary" />,
      title: 'Apps & Systems',
      description: 'Tailored development, frontend and backend, SaaS platforms.',
      priceMXN: 'From $30,000 MXN',
      priceUSD: 'From $1,750 USD',
      highlight: true,
    },
    {
      icon: <Settings className="w-5 h-5 text-codiva-primary" />,
      title: 'CTO-as-a-service',
      description: 'Ongoing support, product evolution, technical maintenance.',
      priceMXN: 'From $8,000 MXN/month',
      priceUSD: 'From $470 USD/month',
      highlight: false,
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full px-6 md:px-12 py-24 flex justify-center bg-zinc-50"
    >
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md px-6 md:px-12 py-12 text-center">
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
            Services
          </Heading>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {services.map(({ icon, title, description, priceMXN, priceUSD, highlight }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative border ${
                highlight ? 'border-codiva-primary/30 bg-codiva-primary/5' : 'border-zinc-100'
              } rounded-xl p-6 shadow-sm hover:shadow-md hover:scale-[1.015] transition-transform duration-300 flex flex-col justify-between`}
            >
              {highlight && (
                <span className="text-xs text-white bg-codiva-primary px-2 py-0.5 rounded-full absolute top-4 right-4">
                  Best for MVPs
                </span>
              )}

              <div>
                <Heading
                  as="h3"
                  size="text-xl"
                  className="text-zinc-900 font-semibold mb-2 flex items-center gap-2"
                >
                  {icon}
                  {title}
                </Heading>

                <Paragraph className="text-zinc-700 text-base mb-2">
                  {description}
                </Paragraph>
              </div>

              <div className="mt-4">
                <p className="text-base text-codiva-primary font-semibold mb-3">
                  {currentLang === 'es' ? priceMXN : priceUSD}
                </p>

                <button
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                  className="flex items-center gap-1 text-sm text-zinc-600 hover:text-codiva-primary transition"
                >
                  {expandedIndex === index ? (
                    <>
                      Hide details
                      <motion.div animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                        <ChevronUp className="w-4 h-4" />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      View more
                      <motion.div animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pl-1 space-y-2"
                    >
                      {breakdowns[index].map((item, i) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}