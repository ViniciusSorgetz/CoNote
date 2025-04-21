import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import errorHandler from "@/app/errors/errorHandler";

const prisma = new PrismaClient();

// route to create a guest
export async function POST() {
  try {
    const createdGuest = await prisma.guest.create({
      data: {
        folders: {
          create: [
            {
              name: "New Folder",
              notes: {
                create: [
                  {
                    title: "My note",
                    content: "# My note",
                  },
                ],
              },
            },
          ],
        },
      },
      include: {
        folders: {
          include: {
            notes: true,
          },
        },
      },
    });

    return NextResponse.json({ createdGuest }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
