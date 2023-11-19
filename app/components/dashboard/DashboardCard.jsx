import React from "react";

const DashboardCard = ({ icon, title }) => {
  return (
    <div className="card w-[350px] card-compact bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title"><span>{icon}</span>{title}</h2>
        <p className="text-2xl text-primary">10000</p>
      </div>
    </div>
  );
};

export default DashboardCard;
