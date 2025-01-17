import React from 'react';
import { useNavigate } from 'react-router-dom';
import JobForm from '../features/Student/JobForm';
import JobList from '../features/Student/JobList';
import RecruitmentStatus from '../features/Student/RecruitmentStatus';
import JobListing from '../features/Student/JobListing';

const StudentDashboardPage = () => {
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      
      localStorage.removeItem("token"); 
      sessionStorage.removeItem("token"); 

      
      await fetch("https://cpmsapp-q59f2p6k.b4a.run/logout", {
        method: "POST",
        credentials: "include", 
      });

      console.log("User logged out");
      navigate("/login"); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleProfile = () => {
    navigate("/profile"); 
  };

  return (
    <div>
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Welcome to Your Student Dashboard</h1>
          <p className="text-sm">Track your applications, view job statuses, and apply for opportunities!</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleProfile}
            className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-gray-200"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 py-2 px-4 rounded hover:bg-red-600 text-white"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="p-4">
        <section>
          <div className="flex items-center space-x-2 mb-2">
            <span>📄</span>
            <h2 className="text-lg font-bold">Apply for New Jobs</h2>
          </div>
          <JobForm />
        </section>
        <section>
          <div className="flex items-center space-x-2 mb-2">
            <span>💼</span>
            <h2 className="text-lg font-bold">Job Listings</h2>
          </div>
          <JobListing />
        </section>
        <section>
          <div className="flex items-center space-x-2 mb-2">
            <span>📋</span>
            <h2 className="text-lg font-bold">Your Job Applications</h2>
          </div>
          <JobList />
        </section>
        <section>
          <div className="flex items-center space-x-2 mb-2">
            <span>✅</span>
            <h2 className="text-lg font-bold">Recruitment Status</h2>
          </div>
          <RecruitmentStatus />
        </section>
      </main>
    </div>
  );
};

export default StudentDashboardPage;
