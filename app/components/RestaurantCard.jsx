"use client"
import React from "react";
import Link from "next/link";

const RestaurantCard = (props) => {
  return (
    <Link href={`/restaurant/${props.slug}`}>
      <div className="card w-96 bg-base-100 shadow-xl cursor-pointer max-h-[400px] flex flex-col hover:scale-125 hover:transition-all hover:duration-700">
        <figure className="flex-shrink-0">
          <img
            src={props.image}
            alt={props.title}
            className="w-full h-[200px] object-cover"
          />
        </figure>
        <div className="card-body flex flex-col flex-grow">
          <h2 className="card-title flex-shrink-0">
            {props.title}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p className="flex-grow">{props.description}</p>
          <div className="flex justify-between mt-5">
            <div>
              <p>Price: {props.avgPrice}đ</p>
            </div>
            <div className="">
                <div className="badge badge-outline">
                  {props.firstTag}
                </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
