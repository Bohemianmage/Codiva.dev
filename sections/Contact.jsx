'use client';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, useInView } from 'framer-motion';
import toast from 'react-hot-toast';
import Heading from '../components/Heading';

export default function Contact() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { triggerOnce: false, threshold: 0.6 });

  // Validación multilingüe
  const validationSchema = Yup.object({
    name: Yup.string().required(t('contact.validation.required')),
    email: Yup.string()
      .email(t('contact.validation.invalidEmail'))
      .required(t('contact.validation.required')),
    message: Yup.string()
      .min(10, t('contact.validation.tooShort'))
      .required(t('contact.validation.required')),
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full px-6 md:px-12 py-24 flex justify-center bg-zinc-50"
    >
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md px-6 md:px-12 py-12">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <Heading
            as="h2"
            size="text-3xl md:text-4xl"
            className="text-codiva-primary text-center mb-10"
          >
            {t('contact.title')}
          </Heading>
        </motion.div>

        {/* Formulario */}
        <Formik
          initialValues={{ name: '', email: '', message: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            const toastId = toast.loading(t('contact.loading') || 'Sending message...');

            try {
              const response = await fetch('/api/send-contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
              });

              if (!response.ok) {
                throw new Error('Error sending message');
              }

              toast.success(t('contact.success') || 'Message sent successfully', { id: toastId });
              resetForm();
            } catch (error) {
              toast.error(t('contact.error') || 'Something went wrong. Try again later.', {
                id: toastId,
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 font-inter text-zinc-800">
              {/* Nombre */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  {t('contact.fields.name')}
                </label>
                <Field
                  name="name"
                  className="w-full border border-zinc-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-codiva-primary"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  {t('contact.fields.email')}
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full border border-zinc-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-codiva-primary"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </motion.div>

              {/* Mensaje */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  {t('contact.fields.message')}
                </label>
                <Field
                  name="message"
                  as="textarea"
                  rows="5"
                  className="w-full border border-zinc-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-codiva-primary"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </motion.div>

              {/* Botón */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-codiva-primary text-white py-3 px-6 rounded-2xl hover:bg-[#0c3e3e] transition font-medium"
              >
                {t('contact.button')}
              </motion.button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}