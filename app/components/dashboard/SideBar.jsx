"use client";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const SideBar = () => {
  const session = useSession();
  return (
    <div className="top-0 left-0 fixed w-full p-10 z-99 bg-base-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/"><button className="btn">FoodTour</button></Link>
          <p>Hello {session.data?.user?.name}</p>
        </div>

        <div className="flex gap-4">
          <Link href="/dashboard/">Dashboard</Link>
          <Link href="/dashboard/manage-request">Manage request</Link>
          <Link href="/dashboard/manage-restaurants">Manage restaurant</Link>
          <Link href="/dashboard/manage-tags">Manage tag</Link>
          <Link href="/dashboard/manage-users">Manage user</Link>
        </div>
        <div>
          {session && session.data?.user?.name ? (
            <button className="btn btn-outline" onClick={() => signOut()}>
              Logout
            </button>
          ) : (
            <p>error</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
