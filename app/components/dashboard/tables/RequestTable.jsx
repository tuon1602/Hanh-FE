"use client";
import React from "react";
import Image from "next/image";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const RequestTable = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/req`,
    fetcher
  );
  //   console.log(data.Restaurant)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error wtf</div>;
  const handleUpdateStatus = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/req?id=${id}`,
        {
          method: "PUT",
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
    <div className="overflow-x-auto px-20 m-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Website</th>
            <th>Small information</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Restaurants.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.website}</td>
                <td>{item.smallDetail}</td>
                {item.status == false ? (
                  <td className="badge badge-error">Untouched</td>
                ) : (
                  <td className="badge badge-primary">touched</td>
                )}
                <td>
                  {/* <button
                    className="btn btn-error text-white"
                    onClick={() => handleDeleteTag(item.id)}
                  >
                    Delete
                  </button> */}
                  <button
                    className="btn btn-outline btn-primary"
                    onClick={() => handleUpdateStatus(item.id)}
                  >
                    Update status
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
