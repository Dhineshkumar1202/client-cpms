import React from 'react';
import welcomeImage from '../assets/image1.jpeg'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to Our CPMS</h1>
        <p>
          Manage your college placements effectively. Track your progress, stay organized, and achieve your career goals with ease.
        </p>
        <a href="/signup" className="cta-button">Get Started</a>
      </div>
      <div className="image-container">
        <img src={welcomeImage} alt="Welcome" />
      </div>
    </div>
  );
};

export default Home;
