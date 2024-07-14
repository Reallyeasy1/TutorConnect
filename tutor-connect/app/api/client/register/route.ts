// src/pages/api/client.ts
import { sendMail } from "@/lib/mailService";
import {prisma} from "@/lib/prisma";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, name, contactNumber, address, postalCode } = await req.json();
    console.log('Request Body:', { email, password, name, contactNumber, address, postalCode });

    const hashed = await hash(password, 12);
    console.log('Hashed Password:', hashed);

    const user = await prisma.client.create({
      data: {
        email,
        password: hashed,
        name,
        contactNumber: parseInt(contactNumber),
        address,
        postalCode: parseInt(postalCode),
        active: false,
        image: null,
      },
    });
    console.log('Created User:', user);

    const token = await prisma.activateClientToken.create({
      data: {
        clientId: user.id,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      },
    });
    console.log('Created Token:', token);

    const from: string = "<lowethan11@gmail.com>";
    const to: string = user.email;
    const subject: string = "Please Activate Your Account";
    const mailTemplate: string = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Hello ${user.name},</h2>
        <p>Please click on the link below to activate your account:</p>
        <p>
          <a href="https://tutorconnect-delta.vercel.app/api/client/activate/${token.token}" 
             style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Activate Your Account
          </a>
        </p>
        <p>If you did not request this activation, please ignore this email.</p>
        <br>
        <p>Thank you,</p>
        <p>The TutorConnect Team</p>
      </div>
    `;
    
    sendMail(from, to, subject, mailTemplate);
    console.log('Email Sent:', { from, to, subject, mailTemplate });

    return NextResponse.json({
      user: {
        email: user.email,
      },
    });
  } catch (err: any) {
    console.error('Error:', err);
    return new NextResponse(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 500,
      }
    );
  }
}
