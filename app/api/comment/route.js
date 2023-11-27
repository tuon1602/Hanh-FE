import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

//create a new tag
export async function POST(request) {
  const data = await request.json();
  try {
    if (data) {
      const res = await prisma.Comment.create({ data: data });
      if (res) {
        return NextResponse.json({
          code: "200",
          message: "success to create comment",
        });
      } else {
        return NextResponse.json({
          code: "401",
          message: "failed to create Comment",
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
    const content = searchParams.get("content");
    if (keyword) {
      const findAllCommentByKeyword = await prisma.Comment.findMany({
        where: {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      });
      return NextResponse.json({
        code: "200",
        Comments: findAllCommentByKeyword,
      });
    }
    if (content) {
      const findAllCommentByKeyword = await prisma.Comment.findMany({
        where: {
          content: {
            contains: content,
            mode: "insensitive",
          },
        },
      });
      return NextResponse.json({
        code: "200",
        Comments: findAllCommentByKeyword,
      });
    }
    const allComments = await prisma.Comment.findMany({
      orderBy:{
        createdAt:'desc'
      }
    });
    if (allComments) {
      return NextResponse.json({ code: "200", Comments: allComments });
    } else {
      return NextResponse.json({ code: "404", message: "No comments" });
    }
  } catch (error) {
    console.error(error);
  }
}
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const deleteComment = await prisma.Comment.delete({
        where: {
          id: id,
        },
      });
      if (deleteComment) {
        return NextResponse.json({ code: "200", message: "Comment deleted" });
      } else {
        return NextResponse.json({ code: "404", message: "Comment not found" });
      }
    } else {
      return NextResponse.json({ code: "404", message: "Comment not found" });
    }
  } catch (error) {
    console.error(error);
  }
}
