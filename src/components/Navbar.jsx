import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex space-x-4">
        {/* Links for Navigation */}
        <Link 
          to="/student-dashboard" 
          className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-gray-200"
        >
          Student Dashboard
        </Link>
        <Link 
          to="/admin-dashboard" 
          className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-gray-200"
        >
          Admin Dashboard
        </Link>
        <Link 
          to="/profile" 
          className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-gray-200"
        >
          Profile
        </Link>
        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="bg-red-500 py-2 px-4 rounded hover:bg-red-600 text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
