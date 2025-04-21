import errorHandler from "@/app/errors/errorHandler";
import { NotFoundError } from "@/app/errors/errors";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

interface IParams {
  params: {
    folderId: string;
  };
}

const folderIdSchema = z.object({
  folderId: z
    .string()
    .regex(/^[0-9]+$/gm, "Only numbers are accepted")
    .transform((arg) => Number(arg)),
});
// Route to edit / rename a Folder
export async function PUT(req: Request, { params }: IParams) {
  const folderNameSchema = z.object({
    name: z.string().nonempty(),
  });

  try {
    const { folderId } = folderIdSchema.parse(await params);
    const { name } = folderNameSchema.parse(await req.json());

    // checks if the folder exists
    const checkFolder = await prisma.folder.findFirst({
      where: { id: folderId },
    });

    if (!checkFolder) {
      throw new NotFoundError({ message: "Couldn't find especified folder." });
    }

    const folder = await prisma.folder.update({
      where: { id: Number(folderId) },
      data: { name: name },
    });

    return NextResponse.json(
      { updatedFolder: folder },
      {
        status: 200,
      },
    );
  } catch (error) {
    return errorHandler(error);
  }
}

// Route to delete a Folder
export async function DELETE(_req: Request, { params }: IParams) {
  try {
    const { folderId } = folderIdSchema.parse(await params);

    const checkFolder = await prisma.folder.findFirst({
      where: { id: folderId },
    });

    if (!checkFolder) {
      throw new NotFoundError({ message: "Couldn't find especified folder." });
    }

    const folder = await prisma.folder.delete({
      where: { id: Number(folderId) },
    });

    return NextResponse.json(
      { deletedFolder: folder },
      {
        status: 200,
      },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
