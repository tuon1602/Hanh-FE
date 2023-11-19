import Image from "next/image";
import TagButton from "../components/home/TagButton";
import RestaurantCard from "../components/RestaurantCard";
import { Shuffle,MoreHorizontal } from "../components/IconWrapper";
import Link from "next/link";
export default function Home() {
  return (
    <main className="m-auto w-full flex justify-center items-center flex-col mt-10 gap-20">
      <div>
        <TagButton title="Tag"/>
      </div>
      <div className="flex gap-10">
        <RestaurantCard/>
        <RestaurantCard/>
        <RestaurantCard/>
      </div>
      <div className="flex gap-5">
        <button className="btn btn-lg">Gần đây <Shuffle/> </button>
        {/* <button className="btn btn-lg"><Shuffle/></button> */}
        <Link href="/explore"><button className="btn btn-lg">Xem thêm <MoreHorizontal/></button></Link>
      </div>
    </main>
  );
}
