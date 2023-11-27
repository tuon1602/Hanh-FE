"use client";
import TagTable from "@/app/components/dashboard/tables/TagTable";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const createTag = Yup.object().shape({
  name: Yup.string().required("Required"),
});
const ManageTagPage = () => {
  return (
    <div className="mt-32">
      <ToastContainer />
      <div className="flex justify-center items-center gap-10 mb-10">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          placeholder="Search"
        />
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add Tag
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-5">Add Tag</h3>
            <Formik
              initialValues={{
                name: "",
              }}
              validationSchema={createTag}
              onSubmit={async (values, { resetForm }) => {
                // same shape as initial values
                console.log(values);
                try {
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/tag`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        name: values.name,
                      }),
                    }
                  );
                  if (res.ok) {
                    const resData = await res.json();
                    if (resData.code == 200) {
                      toast.success("Tạo Tag thành công, quay lại trang Tag");
                      resetForm();
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                    } else if (resData.code == 401) {
                      toast.error("Tag đã được tạo");
                    }
                  }
                  else{
                    toast.error("Đang có vấn đề, xin vui lòng thử lại")
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col gap-4">
                  <Field
                    name="name"
                    placeholder="Nhập tag cần thêm"
                    type="text"
                    className="input input-bordered w-full"
                  />
                  {errors.name && touched.name ? (
                    <div className="text-red-500 text-sm">{errors.name}</div>
                  ) : null}
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </Form>
              )}
            </Formik>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <TagTable />
    </div>
  );
};

export default ManageTagPage;
