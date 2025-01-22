import React from 'react';
import Navbar from '../components/Navbar';  
import JobForm from '../features/Student/JobForm';
import JobList from '../features/jobs/JobList';
import RecruitmentStatus from '../features/Student/RecruitmentStatus';
import JobListing from '../features/jobs/JobListing';

const StudentDashboardPage = () => {
  return (
    <div>
      <Navbar /> 
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
