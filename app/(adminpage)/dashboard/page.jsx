"use client";
import React from "react";
// import { getServerSession } from "next-auth";
// import { Options } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import SideBar from "@/app/components/dashboard/SideBar";
import DashboardCard from "@/app/components/dashboard/DashboardCard";
import { Tag, Utensils, Users, ListChecks } from "@/app/components/IconWrapper";

const DashBoardPage = () => {
  // const session = useSession();
  // if (session.status === "unauthenticated") {
  //   redirect("/login");
  // }
  return (
    <div className="mt-32">
      <div className="flex justify-center gap-20">
        <DashboardCard icon={<Utensils />} title="Total restaurants" />
        <DashboardCard icon={<Tag />} title="Total tags" />
        <DashboardCard icon={<Users />} title="Total users" />
        <DashboardCard icon={<ListChecks />} title="Restaurants user request" />
      </div>
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold">Latest Comments</h2>
        <div className="overflow-x-auto px-20">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                <td>Delete</td>

              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
                <td>Delete</td>


              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
                <td>Delete</td>


              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
