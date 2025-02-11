import nodemailer from 'nodemailer';
import env from './env';
import logger from './logger';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail({ to, subject, html }: SendMailOptions) {
  const sentMail = await transporter.sendMail({
    from: env.SMTP_USER,
    to,
    subject,
    html,
  });

  logger.info(`Email sent to ${to}`, 'SYSTEM');

  return sentMail;
}
