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
    return NextResponse.json(
      { message: "User not found" },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json(
    { guest },
    {
      status: 200,
    },
  );
}
