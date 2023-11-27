"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const createComment = Yup.object().shape({
  name: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
  starRating: Yup.number().required("Required"),
});

const Comment = (props) => {
  // console.log(props.restaurantId)
  return (
    <div className="mt-10">
      <ToastContainer />
      {/* //add comment */}
      <p className="mb-5 text-2xl font-bold">Đánh giá nhà hàng tại đây</p>
      <div className="max-w-md">
        <Formik
          initialValues={{
            name: "Người ẩn danh",
            content: "",
            starRating: "",
            restaurantId: props.restaurantId,
          }}
          validationSchema={createComment}
          onSubmit={async (values,{resetForm}) => {
            // same shape as initial values
            console.log(values);

            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/comment`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    content: values.content,
                    name: values.name,
                    starRating: values.starRating,
                    restaurantId: values.restaurantId,
                  }),
                }
              );
              if (res.ok) {
                const data = await res.json();
                console.log(data);
                if (data.code == 200) {
                  toast.success("Bình luận thành công, xin vui lòng đợi ");
                  resetForm()
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                } else {
                  toast.error("Đã xảy ra lỗi, xin vui lòng thử lại");
                }
              } else {
                toast.error("Đã xảy ra lỗi, xin vui lòng thử lại");
              }
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-4">
              <p>Đánh giá</p>
              <Field
                min="1"
                max="5"
                name="starRating"
                type="number"
                className="border p-3"
              />
              <Field
                name="name"
                type="text"
                placeholder="Nhập tên bạn ở đây"
                className="border p-3"
              />
              {errors.name && touched.name ? (
                <div className="text-red-500 text-sm">{errors.name}</div>
              ) : null}

              <Field
                name="content"
                type="textarea"
                placeholder="Suy nghĩ của bạn về nhà hàng này"
                className="border p-3"
              />
              {errors.content && touched.content ? (
                <div className="text-red-500 text-sm">{errors.content}</div>
              ) : null}
              <button
                type="submit"
                className="border-none py-2 rounded hover:opacity-75 bg-black text-white"
              >
                Comment
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {/* //render all comments */}
      <div className="mt-10">
        <p className="mb-5 font-bold text-2xl">
          Danh sách bình luận của nhà hàng
        </p>
        {props.data &&
          props.data.map((item, index) => (
            <div className="mt-5">
              <div className="flex items-center gap-4 mb-2">
                <p className="">
                  Thành viên: <span className="font-bold">{item.name}</span>
                </p>
                <div className="rating rating-md">
                  <input
                    type="radio"
                    name="rating-5"
                    className="mask mask-star-2 bg-orange-400"
                    checked={item.starRating >= 1}
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-5"
                    className="mask mask-star-2 bg-orange-400"
                    checked={item.starRating >= 2}
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-5"
                    className="mask mask-star-2 bg-orange-400"
                    checked={item.starRating >= 3}
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-5"
                    className="mask mask-star-2 bg-orange-400"
                    checked={item.starRating >= 4}
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-5"
                    className="mask mask-star-2 bg-orange-400"
                    checked={item.starRating == 5}
                    disabled
                  />
                </div>
              </div>

              <input
                type="text"
                placeholder={`${item.content}`}
                className="input input-bordered w-full max-w-md"
                disabled
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comment;
