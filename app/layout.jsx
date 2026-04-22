import './globals.css';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import LayoutClient from './LayoutClient'; // Cliente

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

/* Plus Jakarta Sans sustituye Satoshi local: los .woff2 no estaban en el repo y rompían el despliegue. */
const satoshi = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-satoshi',
  weight: ['400', '700'],
});

const siteTitle =
  'Codiva.dev | Desarrollo web personalizado y soluciones digitales';
const siteDescription =
  'Expertos en sitios web, plataformas SaaS y sistemas a medida. En Codiva.dev convertimos ideas complejas en tecnología clara, eficiente y lista para escalar.';

export const metadata = {
  metadataBase: new URL('https://www.codiva.dev'),
  title: {
    default: siteTitle,
    template: '%s | Codiva.dev',
  },
  description: siteDescription,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'vaG5cbLjCNMZe1GDYegB9d3X1f8XFODHZGmk4PtJjFA',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://www.codiva.dev/',
    siteName: 'Codiva.dev',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        type: 'image/png',
        alt: 'Codiva',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/android-chrome-512x512.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${satoshi.variable}`}>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
