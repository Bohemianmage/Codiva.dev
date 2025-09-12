export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { Client as Notion } from '@notionhq/client';
import { Resend } from 'resend';
import { put } from '@vercel/blob';

const MAX_FILES = 5;
const MAX_BYTES = 10 * 1024 * 1024; // 10MB/archivo permitido

function toStr(v) { return typeof v === 'string' ? v : (v ?? '').toString(); }

function validate(p) {
  const e = [];
  const req = ['name','email','company','issueTitle','issueDescription','priority'];
  req.forEach(k => { if (!p[k] || p[k].trim()==='') e.push(`${k} requerido`); });
  if (p.email && !/^\S+@\S+\.\S+$/.test(p.email)) e.push('email inválido');
  if (p.priority && !['Alta','Media','Baja'].includes(p.priority)) e.push('priority inválido');
  return e;
}

function notionProps(body, fileUrls) {
  const props = {
    Name: { title: [{ text: { content: body.issueTitle } }] },
    Status: { select: { name: 'Nuevo' } },
    Priority: { select: { name: body.priority } },
    Company: { rich_text: [{ text: { content: body.company } }] },
    'Reporter Name': { rich_text: [{ text: { content: body.name } }] },
    'Reporter Email': { email: body.email },
    Description: { rich_text: [{ text: { content: body.issueDescription } }] },
    Origin: { select: { name: 'Formulario' } },
    'Created At': { date: { start: new Date().toISOString() } },
  };

  if (fileUrls.length) {
    // Notion Files admite "external" con URL pública
    props.Attachments = {
      files: fileUrls.map((u) => ({ name: u.split('/').pop() || 'attachment', external: { url: u } })),
    };
  }
  return props;
}

async function notifyEmail({ subject, text }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const RESEND_FROM = process.env.RESEND_FROM || 'Codiva Tickets <hello@codiva.dev>';
  const TO = 'hello@codiva.dev';
  if (!RESEND_API_KEY) return { skipped: true };
  const resend = new Resend(RESEND_API_KEY);
  await resend.emails.send({ from: RESEND_FROM, to: [TO], subject, text });
  return { skipped: false };
}

export async function POST(req) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Se requiere multipart/form-data' }, { status: 400 });
    }

    const form = await req.formData();

    const body = {
      name: toStr(form.get('name')),
      email: toStr(form.get('email')),
      company: toStr(form.get('company')),
      issueTitle: toStr(form.get('issueTitle')),
      issueDescription: toStr(form.get('issueDescription')),
      priority: toStr(form.get('priority')),
      privacyConsent: toStr(form.get('privacyConsent')),
    };

    const errors = validate(body);
    if (errors.length) return NextResponse.json({ error: errors.join(' | ') }, { status: 400 });

    // Procesar adjuntos
    const files = form.getAll('attachments').filter(Boolean);
    if (files.length > MAX_FILES) {
      return NextResponse.json({ error: `Máximo ${MAX_FILES} archivos` }, { status: 400 });
    }

    const uploadedUrls = [];
    for (const f of files) {
      // Cada f es un Blob (File) compatible
      if (!f?.size) continue;
      if (f.size > MAX_BYTES) {
        return NextResponse.json({ error: `Archivo ${f.name} excede 10MB` }, { status: 400 });
      }
      // Nombre legible
      const safeName = `${Date.now()}-${(f.name || 'attachment').replace(/\s+/g, '-')}`;
      // Subida pública a Vercel Blob
      const { url } = await put(`tickets/${safeName}`, f, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN, // requerido para escritura
      });
      uploadedUrls.push(url);
    }

    const NOTION_TOKEN = process.env.NOTION_TOKEN;
    const NOTION_TICKETS_DB_ID = process.env.NOTION_TICKETS_DB_ID;
    if (!NOTION_TOKEN || !NOTION_TICKETS_DB_ID) {
      return NextResponse.json({ error: 'Faltan NOTION_TOKEN/NOTION_TICKETS_DB_ID' }, { status: 500 });
    }

    const notion = new Notion({ auth: NOTION_TOKEN });
    const page = await notion.pages.create({
      parent: { database_id: NOTION_TICKETS_DB_ID },
      properties: notionProps(body, uploadedUrls),
    });

    const url = page?.url ?? '(sin URL)';
    const subject = `[Ticket] ${body.priority} · ${body.issueTitle}`;
    const lines = [
      `Nuevo ticket`,
      `Prioridad: ${body.priority}`,
      `Título: ${body.issueTitle}`,
      `Empresa: ${body.company}`,
      `Reportado por: ${body.name} <${body.email}>`,
      `Descripción: ${body.issueDescription}`,
      `Notion: ${url}`,
    ];
    if (uploadedUrls.length) {
      lines.push('Adjuntos:');
      uploadedUrls.forEach((u, i) => lines.push(`  ${i + 1}. ${u}`));
    }
    const mail = await notifyEmail({ subject, text: lines.join('\n') });

    return NextResponse.json(
      { ok: true, notionUrl: url, files: uploadedUrls, mailSkipped: mail.skipped },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: 'Error inesperado' }, { status: 500 });
  }
}