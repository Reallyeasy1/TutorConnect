
import { sendMail } from "@/lib/mailService"
import { prisma } from "@/lib/prisma"
import { hash } from "bcrypt"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const {email, password, name, contactNumber, address, postalCode} = await req.json()
        const hashed = await hash(password, 12)

        const user = await prisma.client.create({
            data: {
                email, 
                password: hashed,
                name,
                contactNumber: parseInt(contactNumber),
                address,
                postalCode: parseInt(postalCode)
            }
        })

        const token = await prisma.activateClientToken.create({
            data: {
              clientId: user.id,
              token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
            },
        })

        const from: string = '<lowethan11@gmail.com>'
        const to: string = user.email
        const subject: string = 'Please Activate Your Account'
        const mailTemplate: string = `Hello ${user.name}, <br> Please click on the link to activate your account: http://localhost:3000/api/client/activate/${token.token}`

        sendMail(from, to, subject, mailTemplate);

        return NextResponse.json({
            user: {
                email: user.email
            }
        })

    } catch(err: any) {
        return new NextResponse(JSON.stringify({
            error: err.message
        }),
        {
            status: 500
        })
    }
}