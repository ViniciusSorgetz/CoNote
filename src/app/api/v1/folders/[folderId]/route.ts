import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface IParams {
  params: {
    folderId: string;
  };
}

// Route to edit a Folder
export async function PUT(req: Request, { params }: IParams) {
  const { folderId } = await params;
  const { name } = await req.json();

  const folder = await prisma.folder.update({
    where: { id: Number(folderId) },
    data: { name: name },
  });

  if (!folder) {
    return NextResponse.json(
      { message: "Folder not found" },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json(
    { updatedFolder: folder },
    {
      status: 200,
    },
  );
}

// Route to delete a Folder
export async function DELETE(_req: Request, { params }: IParams) {
  const { folderId } = await params;

  console.log(`FolderID: ${folderId}`);

  const folder = await prisma.folder.delete({
    where: { id: Number(folderId) },
  });

  if (!folder) {
    return NextResponse.json(
      { message: "Folder not found" },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json(
    { deletedFolder: folder },
    {
      status: 200,
    },
  );
}
