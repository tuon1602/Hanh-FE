import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const users = await prisma.User.findMany();
    if (users) {
      return NextResponse.json({ message: "ok", users: users });
    }
  } catch (error) {
    console.error(error);
  }
}
