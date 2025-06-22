import './globals.css';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import LayoutClient from './LayoutClient'; // Cliente

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const satoshi = localFont({
  src: [
    { path: '../fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' }
  ],
  variable: '--font-satoshi',
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