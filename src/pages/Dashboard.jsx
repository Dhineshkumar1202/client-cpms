import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';  // Import Sidebar component
import Navbar from '../components/Navbar';    // Import Navbar component
import Card from '../components/Card';        // Import Card component
import Interviews from './Interview';
import JobList from './JobList';
import JobForm from '../features/jobs/JobForm';
import JobUpdateForm from './JobUpdateForm';
import RecruitmentStatusPage from '../pages/RecruitmentStatusPage';  // Import the new Recruitment Status page

const Dashboard = () => {
  const navigate = useNavigate();
  const [showJobForm, setShowJobForm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('studentId');
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <Navbar />

        {/* Main Sections */}
        <div className="content">
          {/* Recruitment Status Section */}
          <div className="recruitment-status-section">
            <h2 className="section-title">Recruitment Status</h2>
            <RecruitmentStatusPage /> {/* Display the Recruitment Status Page */}
          </div>

          {/* Job Management Section */}
          <div className="job-management">
            <h2 className="section-title">Manage Jobs</h2>
            <button className="toggle-job-form" onClick={() => setShowJobForm(!showJobForm)}>
              {showJobForm ? 'Cancel' : 'Create New Job'}
            </button>
            {showJobForm && <JobForm />}
            <JobList />
          </div>
          
          {/* Interviews Section */}
          <div className="interviews-section">
            <h2 className="section-title">Scheduled Interviews</h2>
            <Interviews />
          </div>

          {/* Cards Section for additional info */}
          <div className="card-container">
            <Card 
              title="Upcoming Job Opportunities" 
              description="Explore the latest job openings in your field."
              link="/job-listings"
            />
            <Card 
              title="My Applications" 
              description="Review your submitted applications."
              link="/applications"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
