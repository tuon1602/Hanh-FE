import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword");
    const slug = searchParams.get("slug");
    if (keyword) {
      const findAllRestaurantByKeyword = await prisma.Restaurant.findMany({
        where: {
          title: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      });
      return NextResponse.json({
        code: "200",
        Restaurant: findAllRestaurantByKeyword,
      });
    } else if (slug) {
      const findRestaurantBySlug = await prisma.Restaurant.findUnique({
        where: {
          slug: slug,
        },
      });
      return NextResponse.json({
        code: "200",
        Restaurant: findRestaurantBySlug,
      });
    } else {
      const allRestaurant = await prisma.Restaurant.findMany();
      if (allRestaurant) {
        return NextResponse.json({ code: "200", Restaurants: allRestaurant });
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
    return NextResponse.json({ code: "500", message: "Server error" });
  }
}
