import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, folderId } = await req.json();

  try {
    const createdFolder = await prisma.folder.create({
      data: {
        name,
        folderId,
      },
    });

    return NextResponse.json({ createdFolder }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
