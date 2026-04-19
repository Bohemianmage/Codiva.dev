import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { escapeHtml } from '@/utils/escapeHtml';

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Servicio de correo no configurado' },
      { status: 503 }
    );
  }

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const from = process.env.RESEND_FROM || 'Codiva.dev <hello@codiva.dev>';
    const resend = new Resend(apiKey);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const { error } = await resend.emails.send({
      from,
      to: 'hello@codiva.dev',
      subject: `Nuevo mensaje de contacto – ${name}`,
      reply_to: email,
      html: `
        <h2>Nuevo mensaje</h2>
        <p><strong>Nombre:</strong> ${safeName}</p>
        <p><strong>Correo:</strong> ${safeEmail}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space: pre-line;">${safeMessage}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message ?? 'Error inesperado' },
      { status: 500 }
    );
  }
}
