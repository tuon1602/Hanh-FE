"use client";
import React from "react";
// import { getServerSession } from "next-auth";
// import { Options } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import SideBar from "@/app/components/dashboard/SideBar";
import DashboardCard from "@/app/components/dashboard/DashboardCard";
import { Tag, Utensils, Users, ListChecks } from "@/app/components/IconWrapper";
import CommentTable from "@/app/components/dashboard/tables/CommentTable";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const DashBoardPage = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
    fetcher
  );
  //   console.log(data.Restaurant)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error wtf</div>;
  console.log(data);
  // const session = useSession();
  // if (session.status === "unauthenticated") {
  //   redirect("/login");
  // }
  return (
    <div className="mt-32">
      <div className="flex justify-center gap-20">
        <DashboardCard icon={<Utensils />} title="Total restaurants" numberData={data?.data?.restaurantCount} />
        <DashboardCard icon={<Tag />} title="Total tags" numberData={data?.data?.tagCount}/>
        <DashboardCard icon={<Users />} title="Total Comment" numberData={data?.data?.commentCount}/>
        <DashboardCard icon={<ListChecks />} title="Restaurants user request"numberData={data?.data?.ReqRestaurantCount} />
      </div>
      <div className="mt-20 text-center">
        <CommentTable />
      </div>
    </div>
  );
};

export default DashBoardPage;
