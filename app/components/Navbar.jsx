import React from "react";
import FoodIcon from "@/app/assets/foodicon.png";
import Link from "next/link";
import CustomInput from "./explore/CustomInput";

const Navbar = () => {
  return (
    <div className="">
      <div className="navbar bg-base-100 flex justify-between">
        <div className="">
          <Link href="/">
            <button className="btn btn-ghost text-xl">FoodTour</button>
          </Link>
        </div>
        <CustomInput />
        <div className="flex gap-5">
          <Link href="/random">Ngẫu nghiên</Link>
          <Link href="/explore">Khám phá</Link>
          <Link href="/gioithieu">Giới thiệu</Link>
          <Link href="/faq">FAQ</Link>
          {/* <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={`${FoodIcon}`} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
