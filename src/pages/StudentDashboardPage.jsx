import React from 'react';
import JobForm from '../features/Student/JobForm';
import JobList from '../features/Student/JobList';
import RecruitmentStatus from '../features/Student/RecruitmentStatus';


const StudentDashboardPage = () => {
  return (
    <div className="student-dashboard">
      <div className="student-dashboard-header">
        <h1>Welcome to Your Student Dashboard</h1>
        <p>Track your applications, view job statuses, and much more!</p>
      </div>
      <div className="student-dashboard-content">
        {/* Job Application Form Section */}
        <div className="form-section">
          <h2>Apply for New Jobs</h2>
          <JobForm />
        </div>

        {/* Job List Section */}
        <div className="applications-section">
       
          <JobList />
        </div>

        {/* Recruitment Status Section */}
        <div className="status-section">
     
          <RecruitmentStatus />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
