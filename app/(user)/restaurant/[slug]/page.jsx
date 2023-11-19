import React from "react";

export async function getRestaurantDetail(slug) {
  const data = await fetch(`${process.env.API_URL}/restaurant?slug=${slug}`, {
    next: {
      revalidate: 3600,
    },
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
  return <div>RestaurantDetail</div>;
};

export default RestaurantDetail;
