'use client';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PRIMARY = '#104E4E';
const NAVBAR_OFFSET = '6rem'; // ~96px. Ajusta si tu navbar es distinto.

export default function TicketPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  // Ocultar CTA global "Quote" SOLO en esta página (si existe .global-quote-btn)
  useEffect(() => {
    const prev = [];
    document.querySelectorAll('.global-quote-btn').forEach((el) => {
      prev.push({ el, display: el.style.display });
      el.style.display = 'none';
    });
    return () => {
      prev.forEach(({ el, display }) => (el.style.display = display));
    };
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Requerido'),
    email: Yup.string().email('Correo inválido').required('Requerido'),
    company: Yup.string().required('Requerido'),
    issueTitle: Yup.string().required('Requerido'),
    issueDescription: Yup.string().min(10, 'Describe con más detalle').required('Requerido'),
    priority: Yup.mixed().oneOf(['Alta', 'Media', 'Baja']).required('Requerido'),
    // incidentTime es opcional -> sin validación
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      company: '',
      issueTitle: '',
      issueDescription: '',
      priority: 'Media',
      incidentTime: '', // HH:mm opcional
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setServerError('');
      try {
        const fd = new FormData();
        Object.entries(values).forEach(([k, v]) => fd.append(k, v));
        // Adjuntos existentes: mantén si ya los implementaste
        // files.forEach((f) => fd.append('attachments', f));

        const res = await fetch('/api/ticket', { method: 'POST', body: fd });
        if (res.ok) {
          setSubmitted(true);
          resetForm();
        } else {
          const data = await res.json().catch(() => ({}));
          setServerError(data?.error || 'Error al crear el ticket.');
        }
      } catch {
        setServerError('No se pudo conectar con el servidor.');
      }
    },
  });

  const Field = ({ label, name, as = 'input', ...rest }) => (
    <div>
      <label className="block mb-1 text-sm font-medium text-zinc-800">{label}</label>
      {as === 'textarea' ? (
        <textarea
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          className="w-full rounded-xl border border-zinc-300 px-4 py-2 outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#104E4E20]"
          rows={rest.rows || 4}
          {...rest}
        />
      ) : as === 'select' ? (
        <select
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          className="w-full rounded-xl border border-zinc-300 px-4 py-2 outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#104E4E20]"
          {...rest}
        />
      ) : (
        <input
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          className="w-full rounded-xl border border-zinc-300 px-4 py-2 outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#104E4E20]"
          {...rest}
        />
      )}
      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-1 text-xs text-red-600">{formik.errors[name]}</p>
      )}
    </div>
  );

  if (submitted) {
    return (
      <div
        className="min-h-[calc(100vh-var(--nav-offset))] flex items-center justify-center px-4"
        style={{ ['--nav-offset']: NAVBAR_OFFSET }}
      >
        <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold mb-2" style={{ color: PRIMARY }}>Ticket registrado</h1>
          <p className="text-zinc-700">Hemos recibido tu reporte.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 w-full rounded-lg py-3 text-white hover:opacity-90 transition"
            style={{ backgroundColor: PRIMARY }}
          >
            Crear otro ticket
          </button>
        </div>
      </div>
    );
  }

  return (
    <main
      className="bg-[#F9FAFB] px-4"
      style={{ paddingTop: `clamp(3rem, 6vw, ${NAVBAR_OFFSET})`, paddingBottom: '4rem' }}
    >
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold mb-2" style={{ color: PRIMARY }}>Reportar ticket</h1>
          <p className="text-sm text-zinc-600">
            Describe el problema, incluye pasos para reproducir y URLs si aplica.
          </p>
        </header>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Nombre" name="name" />
            <Field label="Correo" name="email" type="email" />
            <Field label="Empresa" name="company" />
            <Field label="Prioridad" name="priority" as="select">
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </Field>
          </div>

          <Field label="Título del ticket" name="issueTitle" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Hora del incidente (opcional)"
              name="incidentTime"
              type="time"
              placeholder="HH:mm"
            />
          </div>

          <Field
            label="Descripción del problema"
            name="issueDescription"
            as="textarea"
            rows={6}
            placeholder="Qué esperabas, qué ocurrió, pasos para reproducir, capturas/URLs…"
          />

          {/* Si ya tienes adjuntos, mantenlos aquí. Eliminé el checkbox de privacidad como pediste. */}

          <button
            type="submit"
            className="w-full rounded-lg py-3 text-white hover:opacity-90 transition"
            style={{ backgroundColor: PRIMARY }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Enviando…' : 'Enviar ticket'}
          </button>

          {serverError && <p className="text-center text-sm text-red-600">{serverError}</p>}
        </form>
      </div>

      {/* Ocultar CTA global "Quote" si el botón global usa .global-quote-btn */}
      <style jsx global>{`
        .global-quote-btn { display: none !important; }
      `}</style>
    </main>
  );
}