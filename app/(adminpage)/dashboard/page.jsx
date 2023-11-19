"use client";
import React, { useEffect } from "react";
// import { getServerSession } from "next-auth";
// import { Options } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const DashBoardPage = () => {
  const session = useSession();
  if (session.status === "unauthenticated") {
    redirect("/login");
  }
  return (
    <div>
      {session ? (
        <button className="btn btn-outline" onClick={() => signOut()}>
          Logout
        </button>
      ) : (
        <p>wtf</p>
      )}
    </div>
  );
};

export default DashBoardPage;
