import errorHandler from "@/app/errors/errorHandler";
import { NotFoundError } from "@/app/errors/errors";
import { PrismaClient } from "@prisma/client";
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
        folders: {
          include: {
            folders: {
              include: {
                folders: true,
                notes: true,
              },
            },
            notes: true,
          },
        },
      },
    });

    if (!guest) {
      throw new NotFoundError({ message: "User not found" });
    }

    return NextResponse.json(
      { guest },
      {
        status: 200,
      },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
