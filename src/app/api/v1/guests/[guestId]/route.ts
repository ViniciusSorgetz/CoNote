import errorHandler from "@/app/errors/errorHandler";
import { NotFoundError } from "@/app/errors/errors";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface IParams {
  params: {
    guestId: string;
  };
}

export async function GET(_req: Request, { params }: IParams) {
  const { guestId } = await params;

  try {
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
