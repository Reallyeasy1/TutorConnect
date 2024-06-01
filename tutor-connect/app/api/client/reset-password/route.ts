import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        const passwordResetToken = await prisma.passwordResetClientToken.findUnique({
            where: {
                token,
            },
        })

        if (!passwordResetToken) {
            return NextResponse.json(
                { error: 'Invalid token reset request. Please try resetting your password again.' },
                { status: 400 }
            )
        }

        if (new Date() > new Date(passwordResetToken.createdAt.getTime() + 24 * 60 * 60 * 1000)) {
            return NextResponse.json(
                { error: 'This reset link has expired. Please request a new reset link if needed.' },
                { status: 400 }
            )
        }
        
        if (passwordResetToken.resetAt !== null) {
            return NextResponse.json(
                { error: 'This reset link has already been used. Please request a new reset link if needed.' },
                { status: 400 }
            )
        }

        const encrypted = await hash(password, 12);

        const updateUser = prisma.client.update({
            where: { id: passwordResetToken.clientId },
            data: { password: encrypted },
        })

        const updateToken = prisma.passwordResetClientToken.update({
            where: { id: passwordResetToken.id },
            data: { resetAt: new Date() },
        })

        await prisma.$transaction([updateUser, updateToken])

        return NextResponse.json({ success: 'Password reset successfully' })

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again and if the problem persists, contact support.' },
            { status: 500 }
        )
    }
}
