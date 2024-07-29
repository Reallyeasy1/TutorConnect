import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const email = formData.get("email");
    const contactNumber = formData.get("contactNumber");
    const dateOfBirth = formData.get("dateOfBirth");
    const gender = formData.get("gender");
    const age = formData.get("age");
    const nationality = formData.get("nationality");
    const race = formData.get("race");
    const image = formData.get("image");

    console.log("Received form data:", {
      email,
      contactNumber,
      dateOfBirth,
      gender,
      age,
      nationality,
      race,
      image,
    });

    if (!email || !contactNumber || !dateOfBirth || !gender || !age || !nationality || !race) {
      console.error("Missing required fields");
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    let updateData: any = {
      contactNumber: parseInt(contactNumber as string),
      dateOfBirth: new Date(dateOfBirth as string),
      gender,
      age: parseInt(age as string),
      nationality,
      race,
    };

    if (image) {
      updateData.image = image;
    }

    console.log("Update data:", updateData);

    const updatedTutor = await prisma.tutor.update({
      where: { email: email as string },
      data: updateData,
    });

    console.log("Updated tutor:", updatedTutor);

    return NextResponse.json({ success: "Changes made successfully" });
  } catch (err) {
    console.error("Error updating client:", err);

    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again and if the problem persists, contact support.",
      },
      { status: 500 }
    );
  }
}
