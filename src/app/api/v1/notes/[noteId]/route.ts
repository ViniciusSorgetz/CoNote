import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface IParams {
  params: {
    noteId: string;
  };
}

// Route to edit a Note
export async function PUT(req: Request, { params }: IParams) {
  const { noteId } = await params;
  const { title } = await req.json();

  const note = await prisma.note.update({
    where: { id: Number(noteId) },
    data: { title: title },
  });

  if (!note) {
    return NextResponse.json(
      { message: "Note not found" },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json(
    { updatedNote: note },
    {
      status: 200,
    },
  );
}
