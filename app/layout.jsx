import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingQuoteButton from '../components/FloatingQuoteButton';

import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

// ✅ Importa el componente de toast
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const satoshi = localFont({
  src: [
    {
      path: '../fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
});

// ✅ Metadatos SEO
export const metadata = {
  title: 'Codiva.dev | Desarrollo web a la medida sin complicaciones',
  description:
    'Creamos soluciones web personalizadas, modernas y funcionales. Desarrollo frontend, backend y experiencia completa. Cotiza hoy con Codiva.dev.',
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'google-site-verification': 'vaG5cbLjCNMZe1GDYegB9d3X1f8XFODHZGmk4PtJjFA',
    'og:title': 'Codiva.dev | Desarrollo web a la medida',
    'og:description': 'Soluciones digitales a tu medida. Frontend, backend y UX de alta calidad. Solicita tu cotización.',
    'og:url': 'https://www.codiva.dev/',
    'og:type': 'website',
    'og:image': 'https://www.codiva.dev/og-image.jpg',
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Codiva.dev | Desarrollo web a la medida',
    'twitter:description': 'Desarrollos a medida con experiencia visual y funcional impecable.',
    'twitter:image': 'https://www.codiva.dev/og-image.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${satoshi.variable}`}>
      <body className="bg-neutral-50 text-zinc-900 font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
        <FloatingQuoteButton />

        {/* ✅ Toasts globales */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            className: 'font-inter text-sm',
          }}
        />
      </body>
    </html>
  );
}