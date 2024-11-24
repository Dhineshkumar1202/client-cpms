import React from 'react';

const Card = ({ title, description, link }) => {
  return (
    <div className="card">
      <img src="https://via.placeholder.com/300x200" alt="Card Image" className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{description}</p>
        <a href={link} className="card-btn">Read More</a>
      </div>
    </div>
  );
};

export default Card;
