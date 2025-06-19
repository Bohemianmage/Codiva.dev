'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import Heading from '../components/Heading';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().min(10, 'Too short').required('Required'),
});

export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full px-6 md:px-12 py-24 flex justify-center bg-[#F9FAFB]"
    >
      <div className="w-full max-w-2xl bg-white rounded-xl px-6 md:px-12 py-12 shadow-sm border border-zinc-200">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Heading
            as="h2"
            size="text-3xl md:text-4xl"
            className="text-codiva-primary text-center mb-10"
          >
            Let’s talk
          </Heading>
        </motion.div>

        {/* Formulario */}
        <Formik
          initialValues={{ name: '', email: '', message: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 font-inter text-zinc-800">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
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
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
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
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
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
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-codiva-primary text-white py-3 px-6 rounded-2xl hover:bg-[#0c3e3e] transition font-medium"
              >
                Send Message
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}