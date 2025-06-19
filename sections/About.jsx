'use client';

import { motion } from 'framer-motion';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';

export default function About() {
  return (
    <section
      id="about"
      className="w-full px-6 md:px-12 py-24 flex justify-center bg-transparent"
    >
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm px-8 py-12 text-center">
        {/* Título animado */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Heading
            as="h2"
            size="text-3xl md:text-4xl"
            className="text-codiva-primary mb-6"
          >
            About
          </Heading>
        </motion.div>

        {/* Párrafo animado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Paragraph className="max-w-2xl mx-auto text-codiva-secondary text-lg">
            I turn ideas into structured digital solutions.
            <br className="hidden md:block" />
            I develop web projects and SaaS for those who need clarity,
            efficiency, and real technical partnership.
          </Paragraph>
        </motion.div>
      </div>
    </section>
  );
}