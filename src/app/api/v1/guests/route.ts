import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
