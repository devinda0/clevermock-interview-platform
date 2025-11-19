import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail({ to, subject, html }: EmailOptions) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email credentials not found. Skipping email sending.');
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"CleverMock" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendConfirmationEmail(email: string) {
  const subject = 'Welcome to CleverMock Waitlist!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <h1 style="color: #2563eb;">Welcome to CleverMock!</h1>
      <p>Hi there,</p>
      <p>Thanks for joining the waitlist for <strong>CleverMock</strong>. We're excited to have you on board!</p>
      <p>We are working hard to bring you the best AI-powered mock interview experience. We'll notify you as soon as your spot opens up.</p>
      <p>In the meantime, stay tuned for updates.</p>
      <br>
      <p>Best regards,</p>
      <p>The CleverMock Team</p>
    </div>
  `;

  return sendEmail({ to: email, subject, html });
}
