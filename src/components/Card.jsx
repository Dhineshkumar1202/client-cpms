import React from "react";

const Card = ({ title, description, subject, onApply }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-sm text-gray-500 mb-4">Subject: {subject}</p>
      <button
        onClick={onApply}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Apply Now
      </button>
    </div>
  );
};

export default Card;
