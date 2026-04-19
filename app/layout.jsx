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

// ❌ No exportamos title/description para permitir cambio dinámico
export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'google-site-verification': 'vaG5cbLjCNMZe1GDYegB9d3X1f8XFODHZGmk4PtJjFA',
    'og:url': 'https://www.codiva.dev/',
    'og:type': 'website',
    'og:image': 'https://www.codiva.dev/og-image.jpg',
    'twitter:card': 'summary_large_image',
    'twitter:image': 'https://www.codiva.dev/og-image.jpg',
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