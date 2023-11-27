"use client";
import React, { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CommentTable = () => {
  const [commentInputData, setCommentInputData] = useState("");
  const apiURL =
    commentInputData.length >= 5
      ? `${process.env.NEXT_PUBLIC_API_URL}/comment?content=${commentInputData}`
      : `${process.env.NEXT_PUBLIC_API_URL}/comment`;
  // const { data, error, isLoading, mutate } = useSWR(
  //   `${process.env.NEXT_PUBLIC_API_URL}/comment?content=${commentInputData}`,
  //   fetcher
  // );
  // //   console.log(data.Restaurant)
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>error wtf</div>;
  // setCommentData(data.Comments)

  const { data, error, isLoading, mutate } = useSWR(apiURL, fetcher);
  //   console.log(data.Restaurant)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error wtf</div>;
//   console.log(data);

  const handleDeleteComment = async (id) => {
    if (id) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comment?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        const resData = await res.json();
        if (resData.code == 200) {
          toast.success("Xóa comment thành công");
          setTimeout(() => {
            mutate(data);
          }, 2000);
        } else {
          toast.error("Xóa comment lỗi, vui lòng thử lại");
        }
      } else {
        toast.error("Xóa comment lỗi, vui lòng thử lại");
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-5">Latest Comments</h2>
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered input-primary w-full max-w-xs"
        onChange={() => setCommentInputData(event.target.value)}
      />
      <div className="overflow-x-auto px-20">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Content</th>
              <th>Rating</th>
              <th>Create time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data &&
              data?.Comments.map((comment, index) => (
                <tr key={index}>
                  <td>{comment.name}</td>
                  <td>{comment.content}</td>
                  <td>{comment.starRating}</td>
                  <td>
                    {moment(comment.createdAt).format(
                      "HH:mm, dddd, MMMM Do YYYY"
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-error text-white"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentTable;
