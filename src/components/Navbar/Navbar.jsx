import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  return (
    <div className="navbar">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
