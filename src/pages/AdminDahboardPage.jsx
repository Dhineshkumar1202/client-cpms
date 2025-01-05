import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
// import Sidebar from '../components/Sidebar/Sidebar';
import DashboardCard from '../components/Dashboardcard/DashboardCard';
import AcademicRecords from '../features/Admin/AcademicRecords';
import PlacementDriveReport from '../features/Admin/PlacementDrive';
import RecruitmentStatusPage from '../features/Admin/RecruitmentStatusPage';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      
      <div className="main-content">
        <Navbar onLogout={handleLogout} />
        <header>
          <h1>Welcome to the Admin Dashboard</h1>
        </header>

        <section className="dashboard-cards">
          <DashboardCard title="Total Students Placed" value="150" color="blue" icon="fa-user-check" />
          <DashboardCard title="Total Drives Conducted" value="20" color="green" icon="fa-calendar-check" />
          <DashboardCard title="Total Offers Made" value="100" color="yellow" icon="fa-check-circle" />
          <DashboardCard title="Active Placements" value="50" color="red" icon="fa-users" />
        </section>

        <section className="section">
          <h2>Academic Records</h2>
          <AcademicRecords studentId="12345" />
        </section>

        <section className="section">
          <h2>Placement Drive Report</h2>
          <PlacementDriveReport />
        </section>

        <section className="section">
          <h2>Recruitment Status</h2>
          <RecruitmentStatusPage />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
