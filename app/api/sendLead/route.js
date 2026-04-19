import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { Resend } from 'resend';
import { escapeHtml } from '@/utils/escapeHtml';

export async function POST(request) {
  try {
    const body = await request.json();

    const notionToken = process.env.NOTION_TOKEN;
    const databaseId = process.env.NOTION_DATABASE_ID;
    const resendKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM;
    if (!notionToken || !databaseId || !resendKey || !resendFrom) {
      return NextResponse.json(
        { error: 'Servicio no configurado (Notion/Resend)' },
        { status: 503 }
      );
    }

    const notion = new Client({ auth: notionToken });

    const properties = {
      'Nombre completo': {
        title: [{ text: { content: body.name || 'Sin nombre' } }],
      },
      'Empresa/Marca': {
        rich_text: [{ text: { content: body.company || 'Sin empresa' } }],
      },
      'Email': { email: body.email || '' },
      'WhatsApp': { phone_number: body.phone || '' },
      '¿Qué necesitas?': {
        rich_text: [{ text: { content: body.need || '' } }],
      },
      'Secciones deseadas': {
        multi_select: Array.isArray(body.sections)
          ? body.sections.map((item) => ({ name: item }))
          : [],
      },
      'Funcionalidades requeridas': {
        multi_select: Array.isArray(body.functionalities)
          ? body.functionalities.map((item) => ({ name: item }))
          : [],
      },
      'Canal de entrada': { select: { name: 'Web' } },
      'Observaciones adicionales': {
        rich_text: [{ text: { content: '' } }],
      },
      ...(body.hasContent && {
        '¿Tienes contenido?': { select: { name: body.hasContent } },
      }),
      ...(body.hasDomain && {
        '¿Tienes dominio?': { select: { name: body.hasDomain } },
      }),
      ...(body.hasHosting && {
        '¿Tienes hosting?': { select: { name: body.hasHosting } },
      }),
      ...(body.referenceSite && {
        '¿Tienes sitios de referencia?': { url: body.referenceSite },
      }),
      ...(body.deliveryDate && {
        'Fecha deseada de entrega': { date: { start: body.deliveryDate } },
      }),
      ...(body.budget && {
        'Presupuesto estimado': { number: parseFloat(body.budget) },
      }),
    };

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties,
    });

    const resend = new Resend(resendKey);
    const greeting = escapeHtml(body.name || 'Cliente');
    await resend.emails.send({
      from: resendFrom,
      to: body.email,
      subject: 'Hemos recibido tu solicitud en Codiva.dev',
      html: `<p>Hola ${greeting},</p><p>Gracias por contactarnos. Pronto nos pondremos en contacto contigo.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al enviar a Notion o Resend:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}