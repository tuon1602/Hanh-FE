import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";


/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: Hello World!
 */
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
        include:{
          comments: true
        }
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
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const RestaurantDelete = await prisma.Restaurant.delete({
        where: {
          id: id,
        },
      });
      if (RestaurantDelete) {
        return NextResponse.json({ code: "200", message: "Restaurant deleted" });
      } else {
        return NextResponse.json({ code: "404", message: "Restaurant not found" });
      }
    } else {
      return NextResponse.json({ code: "404", message: "Restaurant not found" });
    }
  } catch (error) {
    console.error(error);
  }
}
