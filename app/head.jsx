export const metadata = {
  title: 'Codiva.dev | Desarrollo web a la medida sin complicaciones',
  description: 'Creamos soluciones web personalizadas, modernas y funcionales. Desarrollo frontend, backend y experiencia completa. Cotiza hoy con Codiva.dev.',
};

export default function Head() {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="google-site-verification" content="vaG5cbLjCNMZe1GgmHoQ2TV4A23cMK1IqFCZsmj_yA8" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href="https://www.codiva.dev/" />

      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content="https://www.codiva.dev/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.codiva.dev/og-image.jpg" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content="https://www.codiva.dev/og-image.jpg" />
    </>
  );
}