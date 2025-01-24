import React from "react";
import Navbar from "../components/Navbar";  
import RecruitmentStatus from "../features/Student/RecruitmentStatus";
import JobListing from "../features/jobs/JobListing"; 

const StudentDashboardPage = () => {
  return (
    <div>
      <Navbar /> 
      <main className="p-4">
        {/* Apply for New Jobs Section */}
        <section>
          <div className="flex items-center space-x-2 mb-2">
            <span>📄</span>
            <h2 className="text-lg font-bold">Apply for New Jobs</h2>
          </div>
          {/* Add relevant logic for applying to jobs, if needed */}
        </section>

        {/* Job Listings Section */}
        <section>
          <div className="flex items-center space-x-2 mb-2">
            <span>💼</span>
            <h2 className="text-lg font-bold">Job Listings</h2>
          </div>
          <JobListing /> {/* Render Job Listings */}
        </section>

        {/* Your Job Applications Section */}
        <section>
          <div className="flex items-center space-x-2 mb-2">
            <span>📋</span>
            <h2 className="text-lg font-bold">Your Job Applications</h2>
          </div>
          {/* Add logic for viewing applications */}
        </section>

        {/* Recruitment Status Section */}
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
