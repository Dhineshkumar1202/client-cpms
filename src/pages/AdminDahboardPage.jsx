import React from 'react';
import AcademicRecords from '../features/Admin/AcademicRecords';
import PlacementDriveReport from '../features/Admin/PlacementDreiveReport';
import RecruitmentStatusPage from '../features/Admin/RecruitmentStatusPage';

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard">
      <header>
        <h1>Admin Dashboard</h1>
      </header>
      <main>
        <section className="academic-records-section">
          <h2>Academic Records</h2>
          <AcademicRecords studentId="12345" />
        </section>
        <section className="placement-drive-section">
          <h2>Placement Drive Report</h2>
          <PlacementDriveReport />
        </section>
        <section className="recruitment-status-section">
          <h2>Recruitment Status</h2>
          <RecruitmentStatusPage />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
