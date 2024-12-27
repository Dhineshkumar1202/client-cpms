import React from 'react';
import JobForm from '../features/Student/JobForm';
import JobList from '../features/Student/JobList';
import RecruitmentStatus from '../features/Student/RecruitmentStatus';

const StudentDashboardPage = () => {
  return (
    <div className="student-dashboard">
      {/* Header Section */}
      <header className="student-dashboard-header">
        <h1>Welcome to Your Student Dashboard</h1>
        <p>Track your applications, view job statuses, and apply for opportunities!</p>
      </header>

      {/* Main Content Section */}
      <main className="student-dashboard-content">
        {/* Apply for New Jobs */}
        <section className="dashboard-card">
          <div className="card-header">
            <span className="card-icon">📄</span>
            <h2>Apply for New Jobs</h2>
          </div>
          <JobForm />
        </section>

        {/* Your Job Applications */}
        <section className="dashboard-card">
          <div className="card-header">
            <span className="card-icon">📋</span>
            <h2>Your Job Applications</h2>
          </div>
          <JobList />
        </section>

        {/* Recruitment Status */}
        <section className="dashboard-card">
          <div className="card-header">
            <span className="card-icon">✅</span>
            <h2>Recruitment Status</h2>
          </div>
          <RecruitmentStatus />
        </section>
      </main>
    </div>
  );
};

export default StudentDashboardPage;
