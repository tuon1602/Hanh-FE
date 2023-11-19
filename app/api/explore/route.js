import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const strict = searchParams.get("strict");
  const price = searchParams.get("price");
  //   console.log(city, strict, price);
  try {
    // full 3 params
    if (city && strict && price === "lowToHigh") {
      console.log("3 thg ");
      const restaurants = await prisma.Restaurant.findMany({
        where: {
          address: {
            contains: city && strict,
          },
        },
        orderBy: {
          avgPrice: "asc",
        },
      });
      return NextResponse.json({ code: "200", data: restaurants });
      // full 3 params
    } else if (city && strict && price === "highToLow") {
      console.log("3 thg ");
      const restaurants = await prisma.Restaurant.findMany({
        where: {
          address: {
            contains: city && strict,
          },
        },
        orderBy: {
          avgPrice: "desc",
        },
      });
      return NextResponse.json({ code: "200", data: restaurants });

      //only city params
    } else if (city && strict === null && price === null) {
      console.log("covao city k k");
      const restaurants = await prisma.Restaurant.findMany({
        where: {
          address: {
            contains: city,
          },
        },
        //   else{
        //     return NextResponse.json({code:"404",data:"No Data"})
        //   }
      });
      return NextResponse.json({ code: "200", data: restaurants });
      //only strict params
    } else if (city === null && strict && price === null) {
      console.log("covao strict k k");
      const restaurants = await prisma.Restaurant.findMany({
        where: {
          address: {
            contains: strict,
          },
        },
      });
      return NextResponse.json({ code: "200", data: restaurants });
    }

    //only price params
    if (price === "lowToHigh" && city === null && strict === null) {
      console.log("bug2");

      const restaurants = await prisma.Restaurant.findMany({
        orderBy: {
          avgPrice: "asc",
        },
      });
      return NextResponse.json({ code: "200", data: restaurants });

      //only price params
    } else if (price === "highToLow" && city === null && strict === null) {
      console.log("bug1");
      const restaurants = await prisma.Restaurant.findMany({
        orderBy: {
          avgPrice: "desc",
        },
      });
      return NextResponse.json({ code: "200", data: restaurants });
    }
    //city and strict
    if (city && strict) {
      console.log("co vao k");
      const restaurants = await prisma.Restaurant.findMany({
        where: {
          address: {
            contains: strict,
            mode: "insensitive",
          },
          AND: [
            {
              address: {
                contains: city,
                mode: "insensitive",
              },
            },
          ],
        },
      });
      return NextResponse.json({ code: "200", data: restaurants });
    }
    //city and price
    if (city && price === "lowToHigh" && strict === null) {
      console.log("debug");
      const restaurants = await prisma.Restaurant.findMany({
        where: {
          address: {
            contains: city,
          },
        },
        orderBy: {
          avgPrice: "asc",
        },
      });
      return NextResponse.json({ code: "200", data: restaurants });

      //city and price
    } else if (city && price === "highToLow" && strict === null) {
      const restaurants = await prisma.Restaurant.findMany({
        where: {
          address: {
            contains: city,
          },
        },
        orderBy: {
          avgPrice: "desc",
        },
      });
      return NextResponse.json({ code: "200", data: restaurants });
    }

    //strict and price
    if (city === null && price === "lowToHigh" && strict) {
      console.log("debug");
      const restaurants = await prisma.Restaurant.findMany({
        where: {
          address: {
            contains: strict,
          },
        },
        orderBy: {
          avgPrice: "asc",
        },
      });
      return NextResponse.json({ code: "200", data: restaurants });

      //strict and price
    } else if (city === null && price === "highToLow" && strict) {
      console.log("debug");
      const restaurants = await prisma.Restaurant.findMany({
        where: {
          address: {
            contains: strict,
          },
        },
        orderBy: {
          avgPrice: "desc",
        },
      });
      return NextResponse.json({ code: "200", data: restaurants });
    } else if (city === null && price === null && strict === null) {
      const restaurants = await prisma.Restaurant.findMany();
      return NextResponse.json({ code: "200", data: restaurants });
    }
  } catch (error) {
    console.error(error);
  }
}
