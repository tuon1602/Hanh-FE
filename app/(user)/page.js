import Image from "next/image";
import TagButton from "../components/home/TagButton";
import RestaurantCard from "../components/RestaurantCard";
import { Shuffle, MoreHorizontal } from "../components/IconWrapper";
import Link from "next/link";

async function getAllTags(){
  const res = await fetch(`${process.env.API_URL}/tag`, {
    next: {
      revalidate: 1,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getFirstThreeRestaurants() {
  const res = await fetch(`${process.env.API_URL}/restaurant/homepage`, {
    next: {
      revalidate: 1,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export default async function Home() {
  const firstThreeRestaurantsData = await getFirstThreeRestaurants();
  const allTags = await getAllTags()
  // console.log(allTags)
  return (
    <main className="m-auto w-full flex justify-center items-center flex-col mt-10 gap-20">
      <div className="flex max-w-[600px] flex-wrap gap-5">
        {allTags?.Tags.map((item,index)=>(
          <TagButton title={item.name}/>
        ))}
      </div>
      <div className="flex gap-10">
        {firstThreeRestaurantsData?.restaurants.map((item, index) => (
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
      <div className="flex gap-5">
        <button className="btn btn-lg">
          Gần đây <Shuffle />{" "}
        </button>
        {/* <button className="btn btn-lg"><Shuffle/></button> */}
        <Link href="/explore">
          <button className="btn btn-lg">
            Xem thêm <MoreHorizontal />
          </button>
        </Link>
      </div>
    </main>
  );
}
