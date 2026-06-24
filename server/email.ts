import nodemailer from "nodemailer";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Configurazione SMTP mancante: imposta SMTP_HOST, SMTP_USER e SMTP_PASS nel file .env",
    );
  }

  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function sendContactEmail(message: ContactMessage): Promise<void> {
  const transporter = createTransporter();

  const from = process.env.CONTACT_FROM || process.env.SMTP_USER;
  const to = process.env.CONTACT_TO || process.env.SMTP_USER;

  const text =
    `Nuovo messaggio dal form di contatto del portfolio\n\n` +
    `Nome: ${message.name}\n` +
    `Email: ${message.email}\n` +
    `Oggetto: ${message.subject}\n` +
    `Data: ${message.timestamp}\n\n` +
    `Messaggio:\n${message.message}\n`;

  const html =
    `<h2>Nuovo messaggio dal form di contatto</h2>` +
    `<p><strong>Nome:</strong> ${escapeHtml(message.name)}</p>` +
    `<p><strong>Email:</strong> ${escapeHtml(message.email)}</p>` +
    `<p><strong>Oggetto:</strong> ${escapeHtml(message.subject)}</p>` +
    `<p><strong>Data:</strong> ${escapeHtml(message.timestamp)}</p>` +
    `<p><strong>Messaggio:</strong></p>` +
    `<p>${escapeHtml(message.message).replace(/\n/g, "<br>")}</p>`;

  await transporter.sendMail({
    from,
    to,
    replyTo: message.email,
    subject: `[Portfolio] ${message.subject} - ${message.name}`,
    text,
    html,
  });
}
