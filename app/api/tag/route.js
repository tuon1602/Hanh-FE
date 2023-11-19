import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

//create a new tag
export async function POST(request) {
  const data = await request.json();
  try {
    if (data) {
      const TagDuplicateCheck = await prisma.Tag.findUnique({
        where: {
          name: data.name,
        },
      });
      if (TagDuplicateCheck) {
        return NextResponse.json({
          code: "401",
          message: "Tag created",
        });
      }
      const res = await prisma.Tag.create({ data: data });
      if (res) {
        return NextResponse.json({ code: "200", message: "success" });
      } else {
        return NextResponse.json({
          code: "401",
          message: "failed to create Tag",
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword");
    if (keyword) {
      const findAllTagByKeyword = await prisma.Tag.findMany({
        where: {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      });
      return NextResponse.json({ code: "200", Tags: findAllTagByKeyword });
    }
    const allTags = await prisma.Tag.findMany();
    if (allTags) {
      return NextResponse.json({ code: "200", Tags: allTags });
    }
  } catch (error) {
    console.error(error);
  }
}
export async function DELETE(req) {
  try {
    const data = await req.json();
    if (data) {
      const res = await prisma.Tag.delete({
        where: {
          name: data.name,
        },
      });
      return NextResponse.json({ code: "200", message: "deleted" });
    } else {
      return NextResponse.json({
        code: "401",
        message: "There's some error",
      });
    }
  } catch (error) {
    console.error(error);
  }
}
