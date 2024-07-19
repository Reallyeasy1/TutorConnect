import { sendMail } from "@/lib/mailService";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const issueId = randomUUID();
    const from: string = "<lowethan11@gmail.com>";
    const to: string = "loyongzhe@gmail.com";
    const mailSubject: string = `Issue ID: ${issueId} - ${subject}`;
    
    // Admin Email Template
    const adminMailTemplate: string = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Contact Us Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><strong>Issue ID:</strong> ${issueId}</p>
        <br>
        <p>Thank you,</p>
        <p>The TutorConnect Team</p>
      </div>
    `;

    // Client Email Template
    const clientMailTemplate: string = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Thank You for Contacting Us</h2>
        <p>Hello ${name},</p>
        <p>Thank you for your submission. We will get back to you via email in 2 - 3 working days.</p>
        <p><strong>Issue ID:</strong> ${issueId}</p>
        <p><strong>Your Message:</strong></p>
        <p>${message}</p>
        <br>
        <p>Best regards,</p>
        <p>The TutorConnect Team</p>
      </div>
    `;

    try {
      // Send email to admin
      await sendMail(from, to, `Re: ${mailSubject}`, adminMailTemplate);
      // Send confirmation email to the sender
      await sendMail(from, email, mailSubject, clientMailTemplate);
      console.log('Emails Sent:', { from, to, mailSubject, adminMailTemplate, clientMailTemplate });

      return NextResponse.json({ message: 'Emails sent successfully', issueId });
    } catch (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
  } catch (err: any) {
    console.error('Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
