import React from 'react';
import Navbar from '../components/Navbar';  
import RecruitmentStatus from '../features/Student/RecruitmentStatus';


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
         
        </section>
        <section>
          <div className="flex items-center space-x-2 mb-2">
            <span>💼</span>
            <h2 className="text-lg font-bold">Job Listings</h2>
          </div>
      
        </section>
        <section>
          <div className="flex items-center space-x-2 mb-2">
            <span>📋</span>
            <h2 className="text-lg font-bold">Your Job Applications</h2>
          </div>
         
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
