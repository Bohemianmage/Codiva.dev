import { Resend } from 'resend';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 500 });
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: 'Codiva.dev <hello@codiva.dev>',
      to: 'hello@codiva.dev',
      subject: `Nuevo mensaje de contacto – ${name}`,
      reply_to: email,
      html: `
        <h2>Nuevo mensaje</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space: pre-line;">${message}</p>
      `,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}