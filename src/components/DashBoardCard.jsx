import React from "react";
import PropTypes from "prop-types";

const DashboardCard = ({ title, value, color, icon }) => {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div className="flex items-center p-4 rounded-lg shadow-lg bg-white">
      <div
        className={`flex items-center justify-center w-12 h-12 text-white text-xl rounded-full ${colorClasses[color]}`}
      >
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};


DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.oneOf(["blue", "green", "yellow", "red"]).isRequired,
  icon: PropTypes.string.isRequired,
};


export default DashboardCard;
