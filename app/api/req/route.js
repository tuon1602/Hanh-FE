import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, address, website, smallDetail } = await request.json();
  try {
    const createNewRequestRestaurant = await prisma.ReqRestaurant.create({
      data: {
        name: name,
        address: address,
        website: website,
        smallDetail: smallDetail,
        status: false,
      },
    });
    if (createNewRequestRestaurant) {
      return NextResponse.json({ code: 200, message: "created" });
    } else {
      return NextResponse.json({ code: 400, message: "error" });
    }
  } catch (error) {
    console.error(error);
  }
}
export async function GET(request) {
  const allReqRestaurant = await prisma.ReqRestaurant.findMany();
  if (allReqRestaurant) {
    return NextResponse.json({ code: 200, Restaurants: allReqRestaurant });
  } else {
    return NextResponse.json({ code: 404, message: "Not found" });
  }
}
export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    const existingRequest = await prisma.ReqRestaurant.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingRequest) {
      // Handle the case where the record doesn't exist
      return NextResponse.json({
        code: 404,
        message: "Not found current request",
      });
    }
    const newStatus = !existingRequest.status;
    if (id) {
      const updateStatus = await prisma.ReqRestaurant.update({
        where: {
          id: id,
        },
        data: {
          status: newStatus,
        },
      });
      if (updateStatus) {
        return NextResponse.json({ code: 200, newStatus: updateStatus.status });
      }
    } else {
      return NextResponse.json({ code: 404, message: "Not found" });
    }
  } catch (error) {
    console.error(error);
  }
}
