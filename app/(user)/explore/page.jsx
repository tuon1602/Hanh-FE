"use client";
import React, { useEffect, useState } from "react";
import CustomSelect from "@/app/components/explore/CustomSelect";
import { useSearchParams } from "next/navigation";
import RestaurantCard from "@/app/components/RestaurantCard";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const ExplorePage = () => {
  const params = useSearchParams();
  const cityParams = params.get("city");
  const strictParams = params.get("strict");
  const priceParams = params.get("price");
  const keywordParams = params.get("keyword");
  const tagParams = params.get("tag");
  if (tagParams) {
    const { data, error, isLoading } = useSWR(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurant/tag?keyword=${tagParams}`,
      fetcher
    );
    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    return (
      <div className="mt-32 w-full">
        <div className="flex justify-center gap-20">
          <CustomSelect
            title="Chọn thành phố"
            items={["Hà Nội", "Hồ Chí Minh"]}
            slug="city"
          />
          <CustomSelect
            title="Chọn quận"
            items={["Ba Đình", "Tây Hồ", "Đống Đa", "Cầu Giấy"]}
            slug="strict"
          />
          <CustomSelect
            title="Sắp xếp "
            items={["lowToHigh", "highToLow"]}
            slug="price"
          />
        </div>
        <div className="flex flex-wrap gap-20 justify-center mt-10">
          {data?.data?.map((item, index) => (
            <RestaurantCard
              slug={item.slug}
              title={item.title}
              avgPrice={item.avgPrice}
              address={item.address}
              image={item.images[0]}
              description={item.description}
              firstTag={item.tags[0]}
            />
          ))}
        </div>
      </div>
    );
  }
  // console.log(cityParams,strictParams,price);
  if (cityParams) {
    const { data, error, isLoading } = useSWR(
      `${process.env.NEXT_PUBLIC_API_URL}/explore?city=${cityParams}`,
      fetcher
    );
    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    return (
      <div className="mt-32 w-full">
        <div className="flex justify-center gap-20">
          <CustomSelect
            title="Chọn thành phố"
            items={["Hà Nội", "Hồ Chí Minh"]}
            slug="city"
          />
          <CustomSelect
            title="Chọn quận"
            items={["Ba Đình", "Tây Hồ", "Đống Đa", "Cầu Giấy"]}
            slug="strict"
          />
          <CustomSelect
            title="Sắp xếp "
            items={["lowToHigh", "highToLow"]}
            slug="price"
          />
        </div>
        <div className="flex flex-wrap gap-20 justify-center mt-10">
          {data?.data?.map((item, index) => (
            <RestaurantCard
              slug={item.slug}
              title={item.title}
              avgPrice={item.avgPrice}
              address={item.address}
              image={item.images[0]}
              description={item.description}
              firstTag={item.tags[0]}
            />
          ))}
        </div>
      </div>
    );
  }
  if (strictParams) {
    const { data, error, isLoading } = useSWR(
      `${process.env.NEXT_PUBLIC_API_URL}/explore?strict=${strictParams}`,
      fetcher
    );
    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    return (
      <div className="mt-32 w-full">
        <div className="flex justify-center gap-20">
          <CustomSelect
            title="Chọn thành phố"
            items={["Hà Nội", "Hồ Chí Minh"]}
            slug="city"
          />
          <CustomSelect
            title="Chọn quận"
            items={["Ba Đình", "Tây Hồ", "Đống Đa", "Cầu Giấy"]}
            slug="strict"
          />
          <CustomSelect
            title="Sắp xếp "
            items={["lowToHigh", "highToLow"]}
            slug="price"
          />
        </div>
        <div className="flex flex-wrap gap-20 justify-center mt-10">
          {data?.data?.map((item, index) => (
            <RestaurantCard
              slug={item.slug}
              title={item.title}
              avgPrice={item.avgPrice}
              address={item.address}
              image={item.images[0]}
              description={item.description}
              firstTag={item.tags[0]}
            />
          ))}
        </div>
      </div>
    );
  }
  if (priceParams) {
    const { data, error, isLoading } = useSWR(
      `${process.env.NEXT_PUBLIC_API_URL}/explore?price=${priceParams}`,
      fetcher
    );
    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    return (
      <div className="mt-32 w-full">
        <div className="flex justify-center gap-20">
          <CustomSelect
            title="Chọn thành phố"
            items={["Hà Nội", "Hồ Chí Minh"]}
            slug="city"
          />
          <CustomSelect
            title="Chọn quận"
            items={["Ba Đình", "Tây Hồ", "Đống Đa", "Cầu Giấy"]}
            slug="strict"
          />
          <CustomSelect
            title="Sắp xếp "
            items={["lowToHigh", "highToLow"]}
            slug="price"
          />
        </div>
        <div className="flex flex-wrap gap-20 justify-center mt-10">
          {data?.data?.map((item, index) => (
            <RestaurantCard
              slug={item.slug}
              title={item.title}
              avgPrice={item.avgPrice}
              address={item.address}
              image={item.images[0]}
              description={item.description}
              firstTag={item.tags[0]}
            />
          ))}
        </div>
      </div>
    );
  }
  if (keywordParams) {
    const { data, error, isLoading } = useSWR(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurant?keyword=${keywordParams}`,
      fetcher
    );
    console.log(data);
    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    return (
      <div className="mt-32 w-full">
        <div className="flex justify-center gap-20">
          <CustomSelect
            title="Chọn thành phố"
            items={["Hà Nội", "Hồ Chí Minh"]}
            slug="city"
          />
          <CustomSelect
            title="Chọn quận"
            items={["Ba Đình", "Tây Hồ", "Đống Đa", "Cầu Giấy"]}
            slug="strict"
          />
          <CustomSelect
            title="Sắp xếp "
            items={["lowToHigh", "highToLow"]}
            slug="price"
          />
        </div>
        <div className="flex flex-wrap gap-20 justify-center mt-10">
          {data?.Restaurant?.map((item, index) => (
            <RestaurantCard
              slug={item.slug}
              title={item.title}
              avgPrice={item.avgPrice}
              address={item.address}
              image={item.images[0]}
              description={item.description}
              firstTag={item.tags[0]}
            />
          ))}
        </div>
      </div>
    );
  }
  if (!cityParams || !strictParams || !priceParams || !keywordParams || !tagParams) {
    const { data, error, isLoading } = useSWR(
      `${process.env.NEXT_PUBLIC_API_URL}/explore`,
      fetcher
    );
    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    return (
      <div className="mt-32 w-full">
        <div className="flex justify-center gap-20">
          <CustomSelect
            title="Chọn thành phố"
            items={["Hà Nội", "Hồ Chí Minh"]}
            slug="city"
          />
          <CustomSelect
            title="Chọn quận"
            items={["Ba Đình", "Tây Hồ", "Đống Đa", "Cầu Giấy"]}
            slug="strict"
          />
          <CustomSelect
            title="Sắp xếp "
            items={["lowToHigh", "highToLow"]}
            slug="price"
          />
        </div>
        <div className="flex flex-wrap gap-20 justify-center mt-10">
          {data?.data?.map((item, index) => (
            <RestaurantCard
              slug={item.slug}
              title={item.title}
              avgPrice={item.avgPrice}
              address={item.address}
              image={item.images[0]}
              description={item.description}
              firstTag={item.tags[0]}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default ExplorePage;
