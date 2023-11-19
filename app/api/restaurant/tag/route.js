import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req){
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword");
    console.log(keyword)
    try{
        const restaurants = await prisma.Restaurant.findMany({
            where:{
                tags:{
                    has:keyword,
                }
            }
        })
        if(restaurants){
            return NextResponse.json({code:"200",data:restaurants})
        }
        else{
            return NextResponse.json({code:"404",data:"data not found"})
        }
    }
    catch(error){
        console.error(error);
    }
}