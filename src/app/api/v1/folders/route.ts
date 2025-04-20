import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import errorHandler from "@/app/errors/errorHandler";
import { NotFoundError } from "@/app/errors/errors";

const prisma = new PrismaClient();

const folderSchema = z.object({
  name: z.string().nonempty(),
  folderId: z.optional(z.number()),
  guestId: z.optional(z.string().uuid()),
});

export async function POST(req: Request) {
  try {
    const { name, folderId, guestId } = folderSchema.parse(await req.json());

    // checks if the parent of the folder exists
    if (guestId) {
      const checkGuest = await prisma.guest.findFirst({
        where: { id: guestId },
      });
      if (!checkGuest) {
        throw new NotFoundError({ message: "Couldn't find specified guest." });
      }
    }

    if (folderId) {
      const checkFolder = await prisma.folder.findFirst({
        where: { id: folderId },
      });
      if (!checkFolder) {
        throw new NotFoundError({
          message: "Couldn't find specified parent folder.",
        });
      }
    }

    const createdFolder = await prisma.folder.create({
      data: {
        name,
        folderId,
        guestId,
      },
    });

    return NextResponse.json({ createdFolder }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
