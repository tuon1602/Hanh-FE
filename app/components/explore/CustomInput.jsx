"use client";

import React,{useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CustomInput = () => {
  const router = useRouter();
  const handleChange = (event) => {
    const data = event.target.value;
    if (data && event.key === "Enter") {
      event.preventDefault();
      router.push(`/explore?keyword=${data}`);

    }
  };
  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-24 md:w-auto"
        onKeyUp={handleChange}
      />
    </div>
  );
};

export default CustomInput;
