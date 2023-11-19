"use client";
import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Required"),
});

const LoginPage = () => {
  const router = useRouter()
  const session = useSession();
  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }
  return (
    <div className="w-[500px] m-auto my-20 border border-primary rounded">
      <ToastContainer />
      <div className="py-20">
        <div className="flex justify-center mb-5 items-center text-xl font-bold">
          Admin Login
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            const username = values.username;
            const password = values.password;
            try {
              signIn("credentials", {
                username,
                password,
              });
            } catch (error) {
              toast.error("Your username or password is incorrect");
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col px-20 gap-4">
              <Field
                name="username"
                type="text"
                placeholder="Username"
                className="input input-bordered"
              />
              {errors.username && touched.username ? (
                <div className="text-error text-sm">{errors.username}</div>
              ) : null}
              <Field
                name="password"
                type="password"
                placeholder="Pasword"
                className="input input-bordered"
              />
              {errors.password && touched.password ? (
                <div className="text-error  text-sm">{errors.password}</div>
              ) : null}
              <button
                type="submit"
                className="btn btn-primary border-none py-2 rounded hover:opacity-75"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
