import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { title, folderId } = await req.json();

  try {
    const createdNote = await prisma.note.create({
      data: {
        title,
        content: "",
        folderId,
      },
    });

    return NextResponse.json({ createdNote }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
