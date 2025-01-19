import React from "react";

const Card = ({ title, description, subject, onApply }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-sm text-blue-500">Subject: {subject}</p>
      <button
        onClick={onApply}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Apply Now
      </button>
    </div>
  );
};

export default Card;
