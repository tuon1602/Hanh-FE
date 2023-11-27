import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const getRestaurantCount = await prisma.Restaurant.count();
    const getTagCount = await prisma.Tag.count();
    const getCommentCount = await prisma.Comment.count();
    const getReqRestaurantCount = await prisma.ReqRestaurant.count();
    if (
      getRestaurantCount &&
      getTagCount &&
      getCommentCount &&
      getReqRestaurantCount
    ) {
      return NextResponse.json({
        code: 200,
        data: {
          restaurantCount: getRestaurantCount,
          tagCount: getTagCount,
          commentCount: getCommentCount,
          ReqRestaurantCount: getReqRestaurantCount,
        },
      });
    }
    else{
        return NextResponse.json({code:400,message:"Not found all data"})
    }
  } catch (error) {
    console.error(error);
  }
}
