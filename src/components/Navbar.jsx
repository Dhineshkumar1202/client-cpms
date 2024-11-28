import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Welcome to Student Dashboard</h1>
      </div>

      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="navbar-toggle-bar"></span>
        <span className="navbar-toggle-bar"></span>
        <span className="navbar-toggle-bar"></span>
      </div>

 
      <div className={`navbar-links ${isMobile ? 'active' : ''}`}>
        <a onClick={() => navigate('/home')}>Home</a>
        <a onClick={() => navigate('/profile')}>Profile</a>
        <a onClick={() => navigate('/login')}>Logout</a>
      </div>
    </nav>
  );
};

export default Navbar;
