import FormularioCotizacion from '@/components/FormularioCotizacion';

export default function CotizaPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-codiva-background pt-24 pb-24">
      {/* pt-24: espacio debajo del navbar fijo */}
      {/* pb-24: aire inferior, separa del footer o borde */}
      <FormularioCotizacion />
    </main>
  );
}