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
export async function POST(request) {
  try {
    const data = await request.json();
    if (data) {
      const checkUserDb = await prisma.User.findUnique({
        where: {
          username: data.username,
        },
      });
      if (checkUserDb) {
        return NextResponse.json({ code: "401", message: "user created" });
      } else {
        const user = await prisma.User.create({ data: data });
        if (user) {
          return NextResponse.json({ code: "200", message: "sucessful" });
        }
      }
    } else {
      return NextResponse.json({ code: "401", message: "no parameter" });
    }
  } catch (error) {
    console.error(error);
  }
}
