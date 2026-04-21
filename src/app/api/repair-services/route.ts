import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface RepairSubmission {
  name: string;
  phone: string;
  email?: string;
  machineType: string;
  issue: string;
  urgency: 'today' | 'this-week' | 'whenever';
}

async function saveSubmission(data: RepairSubmission) {
  const timestamp = new Date().toISOString();
  const submission = { id: Date.now().toString(), timestamp, ...data, status: 'pending' };

  const dir = path.join(process.cwd(), 'contacts');
  const file = path.join(dir, 'repair-submissions.json');

  try {
    await fs.mkdir(dir, { recursive: true });
    let submissions: any[] = [];
    try {
      const existing = await fs.readFile(file, 'utf8');
      submissions = JSON.parse(existing);
    } catch {
      submissions = [];
    }
    submissions.push(submission);
    await fs.writeFile(file, JSON.stringify(submissions, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving repair submission:', error);
    return false;
  }
}

async function sendEmail(data: RepairSubmission) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('Resend API key not found. Email will not be sent.');
    return false;
  }

  const urgencyLabel = {
    today: 'TODAY (same-day +50%)',
    'this-week': 'This week',
    whenever: 'Whenever',
  }[data.urgency];

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Wellness Vending Solutions <contact@wellnessvendingsolutions.com>',
      to: ['tuni@wellnessvendingsolutions.com'],
      subject: `[REPAIR] ${data.urgency.toUpperCase()} | ${data.name} | ${data.machineType}`,
      replyTo: data.email || undefined,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">New Repair Service Request</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Urgency:</strong> ${urgencyLabel}</p>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
            ${data.email ? `<p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>` : ''}
            <p><strong>Machine:</strong> ${data.machineType}</p>
            <p><strong>Issue:</strong></p>
            <p style="white-space: pre-wrap;">${data.issue}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return false;
    }
    console.log('Repair request email sent:', emailData);
    return true;
  } catch (error) {
    console.error('Resend error:', error);
    return false;
  }
}

export async function POST(request: Request) {
  const data: RepairSubmission = await request.json();

  if (!data.name || !data.phone || !data.machineType || !data.issue) {
    return NextResponse.json(
      { success: false, message: 'Missing required fields.' },
      { status: 400 }
    );
  }

  try {
    const saved = await saveSubmission(data);
    let emailSent = false;
    try {
      emailSent = await sendEmail(data);
    } catch (emailError) {
      console.error('Email send error:', emailError);
    }

    if (saved) {
      console.log(`Repair request saved: ${data.name} (${data.phone})`);
      return NextResponse.json({
        success: true,
        message: 'Request received. We reply within 24 hours.',
      });
    }
    throw new Error('Failed to save submission');
  } catch (error) {
    console.error('Error processing repair request:', error);
    return NextResponse.json(
      {
        success: false,
        message:
          'Failed to send request. Please call or text 619-776-7976 directly.',
      },
      { status: 500 }
    );
  }
}
