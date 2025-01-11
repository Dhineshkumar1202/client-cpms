import React from 'react';
import JobForm from '../features/Student/JobForm';
import JobList from '../features/Student/JobList';
import RecruitmentStatus from '../features/Student/RecruitmentStatus';
import JobListing from '../features/Student/JobListing';

const StudentDashboardPage = () => {
  return (
    <div>
      <header>
        <h1>Welcome to Your Student Dashboard</h1>
        <p>Track your applications, view job statuses, and apply for opportunities!</p>
      </header>

      <main>
        {/* Apply for New Jobs */}
        <section>
          <div>
            <span>📄</span>
            <h2>Apply for New Jobs</h2>
          </div>
          <JobForm />
        </section>

        {/* Job Listings */}
        <section>
          <div>
            <span>💼</span>
            <h2>Job Listings</h2>
          </div>
          <JobListing /> {/* Render JobListing component */}
        </section>

        {/* Your Job Applications */}
        <section>
          <div>
            <span>📋</span>
            <h2>Your Job Applications</h2>
          </div>
          <JobList />
        </section>

        {/* Recruitment Status */}
        <section>
          <div>
            <span>✅</span>
            <h2>Recruitment Status</h2>
          </div>
          <RecruitmentStatus />
        </section>
      </main>
    </div>
  );
};

export default StudentDashboardPage;
