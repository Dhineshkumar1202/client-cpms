import React from "react";
import { FaHome, FaFileAlt, FaBriefcase, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Menu</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/admin/dashboard" className="flex items-center gap-2 hover:text-gray-300">
            <FaHome /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/academic-records" className="flex items-center gap-2 hover:text-gray-300">
            <FaFileAlt /> Academic Records
          </Link>
        </li>
        <li>
          <Link to="/admin/job-postings" className="flex items-center gap-2 hover:text-gray-300">
            <FaBriefcase /> Job Postings
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-600">
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
