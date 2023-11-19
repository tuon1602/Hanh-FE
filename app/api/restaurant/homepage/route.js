import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const itemCount = await prisma.Restaurant.count();
    // console.log(itemCount)
    const skip = Math.max(0, Math.round(Math.random() * itemCount) - 3);
    const Restaurant = await prisma.Restaurant.findMany({
      take: 3,
      skip: skip,
    });
    if (Restaurant) {
      return NextResponse.json({ code: "200", restaurants: Restaurant });
    } else {
      return NextResponse.json({
        code: "404",
        message: "Restaurant not found",
      });
    }
  } catch (error) {
    console.error(error);
  }
}
