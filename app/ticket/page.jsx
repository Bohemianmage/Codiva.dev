'use client';

/**
 * Formulario de tickets con adjuntos (múltiples).
 * Envío como multipart/form-data a /api/ticket.
 *
 * Mejora: lista de archivos seleccionados con botón "Quitar" (y "Quitar todo").
 */

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PRIMARY = '#104E4E';

/* ---------- Field estable (fuera de TicketPage) ---------- */
function Field({ formik, label, name, as = 'input', id, ...rest }) {
  const inputId = id || name;

  return (
    <div>
      <label htmlFor={inputId} className="block mb-1 text-sm font-medium text-zinc-800">
        {label}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          className="w-full rounded-lg border border-zinc-300 px-4 py-2 outline-none focus:ring-2"
          rows={rest.rows || 4}
          {...rest}
        />
      ) : as === 'select' ? (
        <select
          id={inputId}
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          className="w-full rounded-lg border border-zinc-300 px-4 py-2 outline-none focus:ring-2"
          {...rest}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          className="w-full rounded-lg border border-zinc-300 px-4 py-2 outline-none focus:ring-2"
          {...rest}
        />
      )}

      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-1 text-xs text-red-600">{formik.errors[name]}</p>
      )}
    </div>
  );
}
/* --------------------------------------------------------- */

export default function TicketPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const [files, setFiles] = useState([]); // archivos seleccionados

  // Validación
  const validationSchema = Yup.object({
    name: Yup.string().required('Requerido'),
    email: Yup.string().email('Correo inválido').required('Requerido'),
    company: Yup.string().required('Requerido'),
    issueTitle: Yup.string().required('Requerido'),
    issueDescription: Yup.string().min(10, 'Describe con más detalle').required('Requerido'),
    priority: Yup.mixed().oneOf(['Alta', 'Media', 'Baja']).required('Requerido'),
  });

  // Formik
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
        files.forEach((f) => fd.append('attachments', f));

        const res = await fetch('/api/ticket', { method: 'POST', body: fd });

        if (res.ok) {
          setSubmitted(true);
          resetForm();
          setFiles([]);
        } else {
          const data = await res.json().catch(() => ({}));
          setServerError(data?.error || 'Error al crear el ticket.');
        }
      } catch {
        setServerError('No se pudo conectar con el servidor.');
      }
    },
  });

  // Pantalla de éxito
  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8">
          <h1 className="text-2xl font-semibold mb-2" style={{ color: PRIMARY }}>
            Ticket registrado
          </h1>
          <p className="text-zinc-700">Hemos recibido tu reporte.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 w-full rounded-lg py-3 text-white"
            style={{ backgroundColor: PRIMARY }}
          >
            Crear otro ticket
          </button>
        </div>
      </div>
    );
  }

  // Formulario
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-[#F9FAFB] px-4 py-10 pt-24">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold mb-1" style={{ color: PRIMARY }}>
            Reportar ticket
          </h1>
          <p className="text-sm text-zinc-600">
            Incluye pasos, URLs y adjunta capturas si aplica.
          </p>
        </header>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field formik={formik} label="Nombre" name="name" type="text" />
            <Field formik={formik} label="Correo" name="email" type="email" />
            <Field formik={formik} label="Empresa" name="company" type="text" />
            <Field formik={formik} label="Prioridad" name="priority" as="select">
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </Field>
          </div>

          <Field formik={formik} label="Título del ticket" name="issueTitle" type="text" />

          {/* Hora del incidente (opcional) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              formik={formik}
              label="Hora del incidente (opcional)"
              name="incidentTime"
              type="time"
            />
          </div>

          <Field
            formik={formik}
            label="Descripción del problema"
            name="issueDescription"
            as="textarea"
            rows={6}
            placeholder="Qué esperabas, qué ocurrió, pasos para reproducir, capturas/URLs…"
          />

          {/* Adjuntos */}
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-800">Adjuntos (opcional)</label>
            <input
              type="file"
              multiple
              accept="image/*,.pdf,.txt,.doc,.docx,.xls,.xlsx"
              onChange={(e) => {
                const picked = Array.from(e.target.files || []);
                // Merge + dedupe por nombre-tamaño-fecha
                const merged = [...files, ...picked];
                const seen = new Set();
                const unique = [];
                for (const f of merged) {
                  const key = `${f.name}-${f.size}-${f.lastModified}`;
                  if (!seen.has(key)) {
                    seen.add(key);
                    unique.push(f);
                  }
                }
                setFiles(unique);
                e.target.value = ''; // permite volver a seleccionar los mismos archivos
              }}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2"
            />

            {/* Lista de archivos con botón Quitar */}
            {files.length > 0 && (
              <div className="mt-2">
                <ul className="space-y-2">
                  {files.map((f, idx) => (
                    <li
                      key={`${f.name}-${f.size}-${idx}`}
                      className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2 text-sm"
                    >
                      <span className="truncate">
                        {f.name}{' '}
                        <span className="text-zinc-400">
                          ({(f.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setFiles((prev) => prev.filter((_, i) => i !== idx))}
                        className="ml-3 text-red-600 hover:underline"
                        aria-label={`Quitar ${f.name}`}
                      >
                        Quitar
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setFiles([])}
                    className="text-xs text-zinc-600 hover:underline"
                  >
                    Quitar todo
                  </button>
                </div>
              </div>
            )}

            <p className="mt-1 text-xs text-zinc-500">
              Se aceptan imágenes y documentos. Máx. ~10MB por archivo.
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg py-3 text-white"
            style={{ backgroundColor: PRIMARY }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Enviando…' : 'Enviar ticket'}
          </button>

          {serverError && <p className="text-center text-sm text-red-600">{serverError}</p>}
        </form>
      </div>
    </main>
  );
}