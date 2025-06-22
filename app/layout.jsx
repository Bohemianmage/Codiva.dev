import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

        {/* ✅ Aquí agregamos el componente del toast */}
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