import errorHandler from "@/app/errors/errorHandler";
import { NotFoundError } from "@/app/errors/errors";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

interface IParams {
  params: {
    noteId: string;
  };
}

const noteIdSchema = z.object({
  noteId: z
    .string()
    .regex(/^[0-9]+$/gm, "Only numbers are accepted")
    .transform((arg) => Number(arg)),
});

// Route to edit / rename / edit content of a Note
export async function PUT(req: Request, { params }: IParams) {
  const noteSchema = z.object({
    title: z.string().nonempty(),
    content: z.optional(z.string()),
  });

  try {
    const { noteId } = noteIdSchema.parse(await params);
    const { title, content } = noteSchema.parse(await req.json());

    // checks if the note exists
    const checkNote = await prisma.note.findFirst({
      where: { id: noteId },
    });

    if (!checkNote) {
      throw new NotFoundError({ message: "Couldn't find especified note" });
    }

    const note = await prisma.note.update({
      where: { id: noteId },
      data: { title: title, content: content ? content : checkNote.content },
    });

    return NextResponse.json(
      { updatedNote: note },
      {
        status: 200,
      },
    );
  } catch (error) {
    return errorHandler(error);
  }
}

// Route to delete a Note
export async function DELETE(_req: Request, { params }: IParams) {
  try {
    const { noteId } = noteIdSchema.parse(await params);

    // checks if the note exist
    const checkNote = await prisma.note.findFirst({
      where: { id: noteId },
    });

    if (!checkNote) {
      throw new NotFoundError({ message: "Couldn't find especified note" });
    }

    const note = await prisma.note.delete({
      where: { id: Number(noteId) },
    });

    return NextResponse.json(
      { deletedNote: note },
      {
        status: 200,
      },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
