"use client";
import React from "react";
import Image from "next/image";
import useSWR from "swr";
import { formatToVN } from "@/lib/helper";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const RestaurantTable = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurant`,
    fetcher
  );
  //   console.log(data.Restaurant)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error wtf</div>;
  const handleDeleteRestaurant = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurant?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        const resData = await res.json();
        if (resData.code == 200) {
          mutate(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overflow-x-auto px-20">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Title</th>
            <th>Address</th>
            <th>Description</th>
            <th>Average Price</th>
            <th>Tags</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data &&
            data.Restaurants.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.address}</td>
                <td>{item.description}</td>
                <td>{formatToVN(item.avgPrice)}</td>
                <td>
                  {item.tags.map((tag, index) => (
                    <span key={index} className="ml-2">
                      {tag}
                    </span>
                  ))}
                </td>
                <td className="flex gap-2">
                  {item.images.map((url, index) => (
                    <Image src={url} width={100} height={100} />
                  ))}
                </td>
                <td>
                  <button className="btn mr-4 btn-primary">Edit</button>
                  <button
                    className="btn btn-error text-white"
                    onClick={() => handleDeleteRestaurant(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          {/* <tr>
                <td>wtf</td>
                <td>wtf</td>
                <td>wtf</td>
                <td>wtf</td>
                <td>wtf</td>
                <td>wtf</td>

            </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantTable;
