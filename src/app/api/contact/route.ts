import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

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

// Function to send email using Resend
async function sendEmail(data: any) {
  const { name, email, message } = data;
  
  if (!process.env.RESEND_API_KEY) {
    console.warn('Resend API key not found. Email will not be sent.');
    return false;
  }
  
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Wellness Vending Solutions <contact@wellnessvendingsolutions.com>',
      to: ['tuni@wellnessvendingsolutions.com'],
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">New Contact Form Submission</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            This message was sent from the Wellness Vending Solutions website contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email with Resend:', error);
      return false;
    }

    console.log('Email sent successfully:', emailData);
    return true;
  } catch (error) {
    console.error('Error sending email with Resend:', error);
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
