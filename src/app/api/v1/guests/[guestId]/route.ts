import errorHandler from "@/app/errors/errorHandler";
import { NotFoundError } from "@/app/errors/errors";
import { Folder, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

interface IParams {
  params: {
    guestId: string;
  };
}

const guestIdSchema = z.object({
  guestId: z.string().uuid(),
});

// route to get guest data
export async function GET(_req: Request, { params }: IParams) {
  try {
    const { guestId } = guestIdSchema.parse(await params);

    // find user > folders > folders > folders
    const guest = await prisma.guest.findFirst({
      where: { id: guestId },
      include: {
        folders: true,
      },
    });

    if (!guest) {
      throw new NotFoundError({ message: "User not found" });
    }

    const allFolders = await Promise.all(
      guest.folders.map(async (folder: Folder) => await getSubFolders(folder)),
    );

    async function getSubFolders(folder: Folder) {
      const subFolders = await prisma.folder.findMany({
        where: { folderId: folder.id },
      });
      const notes = await prisma.note.findMany({
        where: { folderId: folder.id },
      });

      if (subFolders.length > 0) {
        const allSubFolders = await Promise.all(
          subFolders.map(
            async (subFolder: Folder) => await getSubFolders(subFolder),
          ),
        );
        const updatedFolder = {
          ...folder,
          folders: allSubFolders,
          notes: notes,
        };
        return updatedFolder;
      }

      return { ...folder, folders: [], notes: notes };
    }

    return NextResponse.json(
      { guest: { ...guest, folders: allFolders } },
      {
        status: 200,
      },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
