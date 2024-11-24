import React from 'react';
import PropTypes from 'prop-types';

const RecruitmentStatusCard = ({ title, value, color, icon }) => {
  return (
    <div className="status-card" style={{ borderColor: color }}>
      <div className="status-card-icon" style={{ backgroundColor: color }}>
        <i className={icon}></i>
      </div>
      <div className="status-card-content">
        <h3>{title}</h3>
        <p className="status-value">{value}</p>
      </div>
    </div>
  );
};

RecruitmentStatusCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default RecruitmentStatusCard;
