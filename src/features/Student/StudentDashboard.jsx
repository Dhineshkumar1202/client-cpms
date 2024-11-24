import React from 'react';
import JobForm from './JobForm';
import JobList from './JobList';
import RecruitmentStatus from './RecruitmentStatus';


const StudentDashboardPage = () => {
  return (
    <div className="student-dashboard">
      <div className="student-dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <p>Track your applications, view job statuses, and much more!</p>
      </div>
      <div className="student-dashboard-content">
        {/* Job Application Form Section */}
        <div className="form-section">
          <h2>Submit Your Job Application</h2>
          <JobForm />
        </div>
        
        {/* Job List Section */}
        <div className="applications-section">
          <h2>Your Job Applications</h2>
          <JobList />
        </div>
        
        {/* Recruitment Status Section */}
        <div className="status-section">
          <h2>Recruitment Status</h2>
          <RecruitmentStatus />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
