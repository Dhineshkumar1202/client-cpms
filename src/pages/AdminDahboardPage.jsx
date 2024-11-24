import React from 'react';
import AcademicRecords from './AcademicRecords';
import PlacementDriveReport from './PlacementDriveReport';
import RecruitmentStatusPage from './RecruitmentStatusPage';

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard">
      <header>
        <h1>Admin Dashboard</h1>
      </header>
      <main>
        <section className="academic-records-section">
          <AcademicRecords studentId="12345" />
        </section>
        <section className="placement-drive-section">
          <PlacementDriveReport />
        </section>
        <section className="recruitment-status-section">
          <RecruitmentStatusPage />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
