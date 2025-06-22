'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

export default function FloatingQuoteButton() {
  const [open, setOpen] = useState(false);
  const [showArrow, setShowArrow] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const handleZoom = () => {
      const zoomLevel = Math.round((window.outerWidth / window.innerWidth) * 100);
      setShowArrow(zoomLevel < 150);
    };

    handleZoom();
    window.addEventListener('resize', handleZoom);
    return () => window.removeEventListener('resize', handleZoom);
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required(t('quote.errors.name')),
    projectType: Yup.string().required(t('quote.errors.projectType')),
    message: Yup.string().min(10, t('quote.errors.messageShort')),
  });

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative flex items-center">
          {/* Animación visible solo en escritorio y sin zoom alto */}
          {showArrow && (
            <div className="hidden md:block absolute right-full mr-4 -mt-1">
              <motion.svg
                viewBox="0 0 300 500"
                className="w-72 h-[500px] text-codiva-primary"
              >
                {/* Línea curva personalizada */}
                <motion.path
                  d="M100,1 C180,-20 350,50 170,160 C120,200 190,250 293,250"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
                {/* Flecha con pulsación rápida */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    delay: 2,
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 0.4,
                    ease: 'easeInOut',
                  }}
                >
                  <path
                    d="M288,245 L293,250 L288,255"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </motion.g>
              </motion.svg>
            </div>
          )}

          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-codiva-primary text-white px-5 py-3 rounded-full shadow-lg text-sm font-medium hover:bg-[#0c3e3e] transition"
          >
            {t('quote.button')}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-semibold mb-4 text-codiva-primary">
                {t('quote.title')}
              </h2>

              <Formik
                initialValues={{ name: '', projectType: '', message: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  const { name, projectType, message } = values;
                  const text = `¡Hola! Me gustaría recibir una cotización.\n\n👤 *${t('quote.fields.name')}:* ${name}\n💼 *${t('quote.fields.projectType')}:* ${projectType}\n📝 *${t('quote.fields.message')}:* ${message || 'N/A'}`;
                  const url = `https://wa.me/5215566819736?text=${encodeURIComponent(text)}`;
                  window.open(url, '_blank');
                  setOpen(false);
                }}
              >
                {() => (
                  <Form className="space-y-4 text-sm text-zinc-800">
                    <div>
                      <label htmlFor="name" className="block mb-1 font-medium">
                        {t('quote.fields.name')}
                      </label>
                      <Field
                        name="name"
                        className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-codiva-primary"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label htmlFor="projectType" className="block mb-1 font-medium">
                        {t('quote.fields.projectType')}
                      </label>
                      <Field
                        as="select"
                        name="projectType"
                        className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-codiva-primary"
                      >
                        <option value="">{t('quote.fields.selectOption')}</option>
                        <option value={t('quote.fields.options.landing')}>
                          {t('quote.fields.options.landing')}
                        </option>
                        <option value={t('quote.fields.options.corporate')}>
                          {t('quote.fields.options.corporate')}
                        </option>
                        <option value={t('quote.fields.options.webapp')}>
                          {t('quote.fields.options.webapp')}
                        </option>
                        <option value={t('quote.fields.options.ecommerce')}>
                          {t('quote.fields.options.ecommerce')}
                        </option>
                        <option value={t('quote.fields.options.other')}>
                          {t('quote.fields.options.other')}
                        </option>
                      </Field>
                      <ErrorMessage name="projectType" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label htmlFor="message" className="block mb-1 font-medium">
                        {t('quote.fields.message')}
                      </label>
                      <Field
                        as="textarea"
                        name="message"
                        rows="4"
                        className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-codiva-primary"
                      />
                      <ErrorMessage name="message" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-codiva-primary text-white py-2.5 rounded-lg hover:bg-[#0c3e3e] transition font-medium"
                    >
                      {t('quote.submit')}
                    </button>
                  </Form>
                )}
              </Formik>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
