"use client";
import React from "react";
import Image from "next/image";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const TagTable = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/tag`,
    fetcher
  );
  //   console.log(data.Restaurant)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error wtf</div>;
  const handleDeleteTag = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tag?id=${id}`,
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
    <div className="overflow-x-auto px-20 max-w-xl m-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Tags.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>
                  <button
                    className="btn btn-error text-white"
                    onClick={() => handleDeleteTag(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          {/* <tr>
              <td>wtf</td>
              <td>wtf</td>
            </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default TagTable;
