import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_req: Request, context: any) {
  const guestId = context.params.guestId;

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

  return NextResponse.json(
    { guest },
    {
      status: 200,
    },
  );
}
