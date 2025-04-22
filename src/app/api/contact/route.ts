import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key (you'll need to set this in your .env.local file)
const sendgridApiKey = process.env.SENDGRID_API_KEY;
if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

// Helper function to save contact submissions to a JSON file
async function saveContactSubmission(data: any) {
  const { name, email, message } = data;
  const timestamp = new Date().toISOString();
  const submission = {
    id: Date.now().toString(),
    timestamp,
    name,
    email,
    message,
    status: 'pending'
  };

  const contactsDir = path.join(process.cwd(), 'contacts');
  const contactsFile = path.join(contactsDir, 'submissions.json');

  try {
    // Create contacts directory if it doesn't exist
    await fs.mkdir(contactsDir, { recursive: true });

    // Read existing submissions or create empty array
    let submissions = [];
    try {
      const existingData = await fs.readFile(contactsFile, 'utf8');
      submissions = JSON.parse(existingData);
    } catch (error) {
      // File doesn't exist yet, start with empty array
      submissions = [];
    }

    // Add new submission and save
    submissions.push(submission);
    await fs.writeFile(contactsFile, JSON.stringify(submissions, null, 2));
    
    return true;
  } catch (error) {
    console.error('Error saving contact submission:', error);
    return false;
  }
}

// Function to send email using SendGrid
async function sendEmail(data: any) {
  const { name, email, message } = data;
  
  if (!sendgridApiKey) {
    console.warn('SendGrid API key not found. Email will not be sent.');
    return false;
  }
  
  const msg = {
    to: 'tuni@wellnessvendingsolutions.com',
    from: process.env.SENDGRID_FROM_EMAIL || 'tuni@wellnessvendingsolutions.com',
    subject: `New Contact Form Submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `,
    html: `
      <div>
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      </div>
    `,
    replyTo: email,
  };
  
  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Error sending email with SendGrid:', error);
    return false;
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  const { name, email, message } = data;

  try {
    // First save the submission locally
    const saved = await saveContactSubmission(data);
    
    // Then try to send email
    let emailSent = false;
    try {
      emailSent = await sendEmail(data);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // We'll continue even if email fails, since we saved the submission
    }
    
    if (saved) {
      console.log(`Contact form submission saved: ${name} (${email})`);
      if (emailSent) {
        console.log(`Email sent to tuni@wellnessvendingsolutions.com`);
      } else {
        console.log(`Email could not be sent, but submission was saved locally`);
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Message received! We will contact you at ' + email
      });
    } else {
      throw new Error('Failed to save submission');
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again or email us directly at tuni@wellnessvendingsolutions.com' },
      { status: 500 }
    );
  }
} 