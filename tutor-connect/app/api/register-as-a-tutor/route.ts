import { prisma } from "@/lib/prisma"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const {email, password, name, contactNumber, dateOfBirth, gender, age, nationality, 
               race, typeOfTutor, yearsOfExperience, highestEducationLevel} = await req.json()
        const hashed = await hash(password, 12)

        const user = await prisma.tutor.create({
            data: {
                email, 
                password: hashed,
                name,
                contactNumber: parseInt(contactNumber),
                dateOfBirth: new Date(dateOfBirth),
                gender,
                age: parseInt(age),
                nationality,
                race,
                typeOfTutor,
                yearsOfExperience: parseInt(yearsOfExperience),
                highestEducationLevel
            }
        })

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