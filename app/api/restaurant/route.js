import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword");
    if (keyword) {
      const findAllRestaurantByKeyword = await prisma.Restaurant.findMany({
        where: {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      });
      return NextResponse.json({
        code: "200",
        Tags: findAllRestaurantByKeyword,
      });
    } else {
      const allRestaurant = await prisma.Restaurant.findMany();
      if (allRestaurant) {
        return NextResponse.json({ code: "200", Tags: allRestaurant });
      }
    }
  } catch (error) {
    console.error(error);
  }
}
export async function POST(request) {
  const data = await request.json();
  try {
    if (data) {
        const restaurantTitleCheck = await prisma.Restaurant.findUnique({
          where: {
            title: data.title,
          },
        });
        if (restaurantTitleCheck) {
          return NextResponse.json({
            code: "401",
            message: "restaurant created",
          });
        }
      const res = await prisma.Restaurant.create({ data: data });
      if (res) {
        return NextResponse.json({ code: "200", message: "success" });
      }
    }
  } catch (error) {
    console.error(error);
  }
}
