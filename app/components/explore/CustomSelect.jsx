"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CustomSelect = (props) => {
  const router = useRouter();
  return (
    <div>
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1">
          {props.title}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 flex flex-col gap-5"
        >
          {props.items?.map((item, index) => (
            <Link href={`/explore?${props.slug}=${item}`}>{item}</Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;
