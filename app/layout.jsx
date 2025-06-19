import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Satoshi no está en Google Fonts, así que se carga localmente:
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

export const metadata = {
  title: 'Codiva.dev – Custom web & SaaS development',
  description: 'Clean code. Custom tech. Without the agency noise.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${satoshi.variable}`}>
      <body className="bg-neutral-50 text-zinc-900 font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}