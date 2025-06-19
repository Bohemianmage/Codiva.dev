import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Codiva.dev',
  description: 'Clean code. Custom tech. Without the agency noise.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-zinc-900 font-sans antialiased">
	<Navbar />
        {children}
	<Footer />
      </body>
    </html>
  );
}