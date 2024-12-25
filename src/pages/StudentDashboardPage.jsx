import React from 'react';
import JobForm from '../features/Student/JobForm';
import JobList from '../features/Student/JobList';
import RecruitmentStatus from '../features/Student/RecruitmentStatus';


const StudentDashboardPage = () => {
  return (
    <div className="student-dashboard">
      <div className="student-dashboard-header">
        <h1>Welcome to Your Student Dashboard</h1>
        <p>Track your applications, view job statuses, and apply for opportunities!</p>
      </div>
      <div className="student-dashboard-content">
        <div className="dashboard-card">
          <div className="card-header">
            <span className="card-icon">📄</span>
            <h2>Apply for New Jobs</h2>
          </div>
          <JobForm />
        </div>
        <div className="dashboard-card">
          <div className="card-header">
            <span className="card-icon">📋</span>
            <h2>Your Job Applications</h2>
          </div>
          <JobList />
        </div>
        <div className="dashboard-card">
          <div className="card-header">
            <span className="card-icon">✅</span>
            <h2>Recruitment Status</h2>
          </div>
          <RecruitmentStatus />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
