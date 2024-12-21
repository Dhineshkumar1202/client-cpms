import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ title, value, color, icon }) => {
  return (
    <div className={`dashboard-card ${color}`}>
      <div className="text">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
      <div className="icon">
        <i className={`fas ${icon}`}></i>
      </div>
    </div>
  );
};

export default DashboardCard;
