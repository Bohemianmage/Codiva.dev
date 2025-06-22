'use client';

import Head from 'next/head';

import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Services from '@/sections/Services';
import CaseStudies from '@/sections/CaseStudies';
import Contact from '@/sections/Contact';

export default function Home() {
  return (
    <>
      <Head>
        <title>Codiva.dev | Desarrollo web a la medida sin complicaciones</title>
        <meta
          name="description"
          content="Creamos soluciones web personalizadas, modernas y funcionales. Desarrollo frontend, backend y experiencia completa. Cotiza hoy con Codiva.dev."
        />
        <meta name="google-site-verification" content="<meta name="google-site-verification" content="vaG5cbLjCNMZe1GDYegB9d3X1f8XFODHZGmk4PtJjFA" />" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.codiva.dev/" />

        {/* Open Graph */}
        <meta property="og:title" content="Codiva.dev | Desarrollo web a la medida" />
        <meta property="og:description" content="Soluciones digitales a tu medida. Frontend, backend y UX de alta calidad. Solicita tu cotización." />
        <meta property="og:url" content="https://www.codiva.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.codiva.dev/og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Codiva.dev | Desarrollo web a la medida" />
        <meta name="twitter:description" content="Desarrollos a medida con experiencia visual y funcional impecable." />
        <meta name="twitter:image" content="https://www.codiva.dev/og-image.jpg" />
      </Head>

      <main className="flex flex-col items-center justify-start w-full px-6 md:px-12">
        <Hero />
        <About />
        <Services />
        <CaseStudies />
        <Contact />
      </main>
    </>
  );
}