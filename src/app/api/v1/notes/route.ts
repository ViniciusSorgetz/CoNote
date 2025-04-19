import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import errorHandler from "@/app/errors/errorHandler";

const prisma = new PrismaClient();

// route for creating a note
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
    errorHandler(error);
  }
}
