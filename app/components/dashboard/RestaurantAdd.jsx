"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const createRestaurant = Yup.object().shape({
  title: Yup.string().required("Required"),
  slug: Yup.string().required("Required"),
  avgPrice: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  website: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const RestaurantAdd = () => {
  //   const cld = new Cloudinary({ cloud: { cloudName: "dnmaspas5" } });
  //   const [selectedImage, setSelectedImage] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [base64images, setBase64Images] = useState([]);
  const [tag, setTag] = useState([]);
  useEffect(() => {
    console.log(tag);
  }, [tag]);
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/tag`,
    fetcher
  );
  //   console.log(data.Restaurant)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error wtf</div>;
  //   console.log(data);
  const handleSelectTags = (event) => {
    const selectedTags = event.target.value;
    // const selectedTags = Array.from(
    //   event.target.selectedOptions,
    //   (option) => option.value
    // );
    setTag((prevTags) => {
      // Check if the selected tag is already in the state
      if (prevTags.includes(selectedTags)) {
        // If it is, remove it
        return prevTags.filter((tag) => tag !== selectedTags);
      } else {
        // If it's not, add it
        return [...prevTags, selectedTags];
      }
    });
  };
  const handleSelectedFile = async (event) => {
    setImageLoading(true);
    const selectedFile = event.target.files;
    // const selectedFlesArray = Array.from(selectedFile);
    // console.log(selectedFlesArray);
    // const imagesArray = selectedFlesArray.map((file) => {
    //   return URL.createObjectURL(file);
    // });
    const convertToBase64 = (selectedFile) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.readAsDataURL(selectedFile);
      });
    const base64ImagesArray = await Promise.all(
      Array.from(selectedFile).map(async (selectedFile) => {
        const base64String = await convertToBase64(selectedFile);
        return base64String;
      })
    );

    setBase64Images([...base64images, ...base64ImagesArray]);
    setImageLoading(false);
    // setBase64Images((previousImage) => previousImage.concat(imagesArray));
  };
  const handleDeleteImage = (index) => {
    const newImages = [...base64images];
    newImages.splice(index, 1);
    setBase64Images(newImages);
  };
  console.log(base64images);
  return (
    <div className="mt-5">
      <ToastContainer />
      <div className="flex gap-5">
        <select
          className="select w-full max-w-md mb-5"
          multiple
          onChange={handleSelectTags}
        >
          <option disabled selected>
            Chọn Tag cho nhà hàng
          </option>
          {data && data.Tags.map((item, index) => <option>{item.name}</option>)}
        </select>
        <div className="flex gap-3">
          <p>Tag đã chọn: </p>
          {tag && tag.map((item, index) => <p>{item}</p>)}
        </div>
      </div>
      <div className="flex flex-col mb-5">
        <label htmlFor="images">Tải ảnh nhà hàng lên</label>
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          name="images"
          multiple
          accept="image/*"
          onChange={handleSelectedFile}
        />
        {base64images &&
          base64images.map((item, index) => (
            <div key={index}>
              <img src={item} height={200} alt="upload image" />
              <button
                className="btn btn-error"
                onClick={() => handleDeleteImage(index)}
              >
                Delete image
              </button>
            </div>
          ))}
      </div>
      <Formik
        initialValues={{
          title: "",
          slug: "",
          avgPrice: "",
          address: "",
          phoneNumber: "",
          website: "",
          description: "",
        }}
        validationSchema={createRestaurant}
        onSubmit={async (values, { resetForm }) => {
          // same shape as initial values
          console.log(values);
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/restaurant`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title: values.title,
                  slug: values.slug,
                  avgPrice: parseInt(values.avgPrice),
                  address: values.address,
                  phoneNumber: values.phoneNumber,
                  website: values.website,
                  description: values.description,
                  tags: tag,
                  images: base64images,
                  hasAnotherAdress: false,
                }),
              }
            );
            if (res.ok) {
              const resData = await res.json();
              if (resData.code == 200) {
                toast.success("Tạo Nhà hàng thành công, quay lại trang Tag");
                resetForm();
                setBase64Images([]);
                setTag([]);
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              } else if (resData.code == 401) {
                toast.error("Nhà hàng  đã được tạo");
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
          <Form className="flex flex-col gap-4">
            <Field
              name="title"
              placeholder="Nhập tên nhà hàng"
              type="text"
              className="input input-bordered w-full"
            />
            {errors.title && touched.title ? (
              <div className="text-red-500 text-sm">{errors.title}</div>
            ) : null}
            <Field
              name="slug"
              placeholder="Nhập Slug cho nhà hàng (ví dụ: KFC Hoàng Quốc Việt - kfc-hoang-quoc-viet)"
              type="text"
              className="input input-bordered w-full"
            />
            {errors.slug && touched.slug ? (
              <div className="text-red-500 text-sm">{errors.slug}</div>
            ) : null}
            <Field
              name="avgPrice"
              placeholder="Nhập giá trung bình phải trả (phải là số, ví dụ:50000)"
              type="text"
              className="input input-bordered w-full"
            />
            {errors.avgPrice && touched.avgPrice ? (
              <div className="text-red-500 text-sm">{errors.avgPrice}</div>
            ) : null}
            <Field
              name="address"
              placeholder="Nhập địa chỉ ( bao gồm số, đường, quận, thành phố)"
              type="text"
              className="input input-bordered w-full"
            />
            {errors.address && touched.address ? (
              <div className="text-red-500 text-sm">{errors.address}</div>
            ) : null}
            <Field
              name="phoneNumber"
              placeholder="Nhập số điện thoại nhà hàng (0123456789)"
              type="text"
              className="input input-bordered w-full"
            />
            {errors.phoneNumber && touched.phoneNumber ? (
              <div className="text-red-500 text-sm">{errors.phoneNumber}</div>
            ) : null}
            <Field
              name="website"
              placeholder="Nhập url của nhà hàng ( bất kì)"
              type="text"
              className="input input-bordered w-full"
            />
            {errors.website && touched.website ? (
              <div className="text-red-500 text-sm">{errors.website}</div>
            ) : null}
            <Field
              name="description"
              placeholder="Nhập Description cho nhà hàng"
              type="text"
              className="input input-bordered w-full"
            />
            {errors.description && touched.description ? (
              <div className="text-red-500 text-sm">{errors.description}</div>
            ) : null}

            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RestaurantAdd;
