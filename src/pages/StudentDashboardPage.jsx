import React from 'react';
import JobForm from '../features/Student/JobForm';
import JobList from '../features/Student/JobList';
import RecruitmentStatus from '../features/Student/RecruitmentStatus';

const StudentDashboardPage = () => {
  return (
    <div>
   
      <header>
        <h1>Welcome to Your Student Dashboard</h1>
        <p>Track your applications, view job statuses, and apply for opportunities!</p>
      </header>

     
      <main>
      
        <section>
          <div>
            <span>📄</span>
            <h2>Apply for New Jobs</h2>
          </div>
          <JobForm />
        </section>

     
        <section>
          <div>
            <span>📋</span>
            <h2>Your Job Applications</h2>
          </div>
          <JobList />
        </section>

     
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
