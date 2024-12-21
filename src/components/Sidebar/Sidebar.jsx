import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FaTachometerAlt, FaGraduationCap, FaChartBar, FaUsers } from 'react-icons/fa'; // Import icons

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Dashboard</h2>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link to="/dashboard" className="sidebar-link">
            <FaTachometerAlt className="sidebar-icon" />
            <span className="sidebar-text">Dashboard</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/academic-records" className="sidebar-link">
            <FaGraduationCap className="sidebar-icon" />
            <span className="sidebar-text">Academic Records</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/placement-drive-report" className="sidebar-link">
            <FaChartBar className="sidebar-icon" />
            <span className="sidebar-text">Placement Drive Report</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/recruitment-status" className="sidebar-link">
            <FaUsers className="sidebar-icon" />
            <span className="sidebar-text">Recruitment Status</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
