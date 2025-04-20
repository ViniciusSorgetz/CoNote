import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import errorHandler from "@/app/errors/errorHandler";
import { z } from "zod";

const prisma = new PrismaClient();

// route for creating a note
export async function POST(req: Request) {
  const noteSchema = z.object({
    title: z.string(),
    folderId: z.number(),
  });

  try {
    const { title, folderId } = noteSchema.parse(await req.json());

    const createdNote = await prisma.note.create({
      data: {
        title,
        content: "",
        folderId,
      },
    });

    return NextResponse.json({ createdNote }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
