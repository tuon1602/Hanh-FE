"use client";
import React from "react";
import RestaurantTable from "@/app/components/dashboard/tables/RestaurantTable";
import RestaurantAdd from "@/app/components/dashboard/RestaurantAdd";
const RestaurantManagePage = () => {
  return (
    <div className="mt-32">
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
          Add Restaurant
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box max-w-5xl">
            <h3 className="font-bold text-lg">Add Restaurant</h3>
            <div>
              <RestaurantAdd />
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* <MultiFileDropzoneUsage/> */}
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <RestaurantTable />
    </div>
  );
};

export default RestaurantManagePage;
