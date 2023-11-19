import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const Restaurant = await prisma.Restaurant.findMany({
      take: 2,
    });
    if (Restaurant) {
      return NextResponse.json({ message: "200", restaurants: Restaurant });
    }
  } catch (error) {
    console.error(error);
  }
}
