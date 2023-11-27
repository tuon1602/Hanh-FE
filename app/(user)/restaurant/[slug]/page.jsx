import React from "react";
import Image from "next/image";
import {
  CircleDollarSign,
  Circle,
  LocateFixed,
  Clock,
  Phone,
  Globe,
  AlertTriangle,
} from "@/app/components/IconWrapper";
import { formatToVN } from "@/lib/helper";
import Link from "next/link";
import Comment from "@/app/components/RestaurantDetail/Comment";

export async function getRestaurantDetail(slug) {
  const data = await fetch(`${process.env.API_URL}/restaurant?slug=${slug}`, {
    cache: "no-store",
  });
  if (!data.ok) {
    throw new Error("failed to fetch restaurant");
  }
  return data.json();
}
const RestaurantDetail = async ({ params }) => {
  const slug = params.slug;
  const restaurantDetail = await getRestaurantDetail(slug);
  console.log(restaurantDetail);
  return (
    <div>
      <div className="container mx-auto my-8">
        <div className="flex">
          <div className="mr-8 flex-shrink-0">
            {restaurantDetail.Restaurant.images.length >= 1 &&
              restaurantDetail.Restaurant.images && (
                <Image
                  width={800}
                  height={800}
                  src={restaurantDetail.Restaurant.images[0]}
                  alt="Món ăn 1"
                  className="rounded-lg"
                />
              )}
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">
              {restaurantDetail.Restaurant.title}
            </h1>
            <div className="flex items-center">
              <CircleDollarSign />
              <p className="ml-2 text-yellow-500 text-xl">
                Giá: {formatToVN(restaurantDetail.Restaurant.avgPrice)}
              </p>
            </div>
            <div className="flex items-center pt-3">
              <Circle />
              {restaurantDetail.Restaurant.tags.map((item, index) => (
                <p className="ml-2">{item}</p>
              ))}
            </div>
            <div className="flex items-center pt-3">
              <LocateFixed />
              <p className="ml-2">{restaurantDetail.Restaurant.address}</p>
            </div>
            <div className="flex items-center pt-3">
              <Clock />
              <p className="ml-2">Giờ mở cửa: 09:00 - 22:30</p>
            </div>
            <div className="border border-yellow-500 h-10 flex items-center justify-center gap-3 rounded-2xl mt-5 p-5">
              <AlertTriangle className="text-yellow-500" />
              <p className="text-center text-yellow-500 text-[18px]">
                Bạn hãy liên hệ hoặc đặt bàn trước khi đến nhé
              </p>
            </div>

            <div
              class="tooltip mt-5"
              data-tip={`${restaurantDetail.Restaurant.phoneNumber}`}
            >
              <button class="btn">
                <Phone />
              </button>
            </div>

            <Link href={restaurantDetail.Restaurant.website} target="_blank">
              <div
                class="tooltip ml-7"
                data-tip={`${restaurantDetail.Restaurant.website}`}
              >
                <button class="btn">
                  <Globe />
                </button>
              </div>
            </Link>

            <div className="mt-5">
              {restaurantDetail.Restaurant.description}
            </div>
          </div>
        </div>
        {/* <div className="flex gap-20 mt-20">
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
      </div> */}
        <div className="mt-10">
          <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Một số hình ảnh của nhà hàng
            </div>
            <div className="collapse-content flex gap-5">
              {restaurantDetail.Restaurant.images.length > 1 &&
                restaurantDetail.Restaurant.images.map((item, index) => (
                  <Image
                    src={item}
                    width={400}
                    height={400}
                    alt={restaurantDetail.Restaurant.slug}
                  />
                ))}
            </div>
          </div>
        </div>
        <Comment
          data={restaurantDetail.Restaurant.comments}
          restaurantId={restaurantDetail.Restaurant.id}
        />
      </div>
    </div>
  );
};

export default RestaurantDetail;
