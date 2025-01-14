import React from 'react';
import JobForm from '../features/Student/JobForm';
import JobList from '../features/Student/JobList';
import RecruitmentStatus from '../features/Student/RecruitmentStatus';
import JobListing from '../features/Student/JobListing';

const StudentDashboardPage = () => {
  const handleLogout = () => {
    
    console.log('Logged out');
  };

  return (
    <div>
      <header>
        <h1>Welcome to Your Student Dashboard</h1>
        <p>Track your applications, view job statuses, and apply for opportunities!</p>
      </header>

      <aside>
        <div className="profile">
          <h3>Your Profile</h3>
          <p>Name: John Doe</p> {/* This can be dynamic depending on the logged-in user */}
          <p>Email: john.doe@email.com</p> {/* Dynamic user data */}
        </div>

        <button onClick={handleLogout} className="logout-button">Logout</button>
      </aside>

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
