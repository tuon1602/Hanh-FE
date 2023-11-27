"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const createRequestRestaurant = Yup.object().shape({
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  website: Yup.string().required("Required"),
  smallDetail: Yup.string().required("Required"),
});

const IndividualForm = () => {
  return (
    <div>
      <ToastContainer />
      <Formik
        initialValues={{
          name: "",
          address: "",
          website: "",
          smallDetail: "",
        }}
        validationSchema={createRequestRestaurant}
        onSubmit={async (values, { resetForm }) => {
          // same shape as initial values
          console.log(values);
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/req`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: values.name,
                address: values.address,
                website: values.website,
                smallDetail: values.smallDetail,
              }),
            });
            if (res.ok) {
              const resData = await res.json();
              if (resData.code == 200) {
                toast.success("Tạo yêu cầu thành công");
                resetForm();
              } else {
                toast.error(
                  "Hệ thống đang có vấn đề, xin vui lòng thử lại sau"
                );
              }
            } else {
              toast.error("Đang có vấn đề, xin vui lòng thử lại");
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-6 mt-5">
            <Field
              name="name"
              placeholder="Nhập tên nhà hàng"
              type="text"
              className="input input-bordered w-full"
            />
            {errors.name && touched.name ? (
              <div className="text-red-500 text-sm">{errors.name}</div>
            ) : null}
            <Field
              name="address"
              placeholder="Nhập địa chỉ nhà hàng"
              type="text"
              className="input input-bordered w-full"
            />
            {errors.address && touched.address ? (
              <div className="text-red-500 text-sm">{errors.address}</div>
            ) : null}
            <Field
              name="website"
              placeholder="Link tới fanpage hoặc website nhà hàng"
              type="text"
              className="input input-bordered w-full"
            />
            {errors.website && touched.website ? (
              <div className="text-red-500 text-sm">{errors.website}</div>
            ) : null}
            <Field
              name="smallDetail"
              placeholder="Thông tin chung về nhà hàng (Ví dụ món ăn nổi bật)"
              type="text"
              className="input input-bordered w-full"
            />
            {errors.smallDetail && touched.smallDetail ? (
              <div className="text-red-500 text-sm">{errors.smallDetail}</div>
            ) : null}
            <button type="submit" className="btn btn-primary">
              Thêm
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default IndividualForm;
