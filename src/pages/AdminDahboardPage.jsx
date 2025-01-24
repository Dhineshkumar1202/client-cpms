import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashBoardCard";
import AcademicRecords from "../features/Admin/AcademicRecords";
import PlacementDriveReport from "../features/Admin/PlacementDrive";
import RecruitmentStatusPage from "../features/Admin/RecruitmentStatusPage";
import JobForm from "../features/jobs/JobForm"; 

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <div className="main-content">
        <Navbar onLogout={handleLogout} />
        <header>
          <h1>Welcome to the Admin Dashboard</h1>
        </header>

        {/* Dashboard Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 dashboard-cards">
          <DashboardCard
            title="Total Students Placed"
            value="150"
            color="blue"
            icon="fa-user-check"
          />
          <DashboardCard
            title="Total Drives Conducted"
            value="20"
            color="green"
            icon="fa-calendar-check"
          />
          <DashboardCard
            title="Total Offers Made"
            value="100"
            color="yellow"
            icon="fa-check-circle"
          />
          <DashboardCard
            title="Active Placements"
            value="50"
            color="red"
            icon="fa-users"
          />
        </section>

        {/* Academic Records Section */}
        <section className="section">
          <h2>Academic Records</h2>
          <AcademicRecords studentId="12345" />
        </section>

        {/* Placement Drive Report Section */}
        <section className="section">
          <h2>Placement Drive Report</h2>
          <PlacementDriveReport />
        </section>

        {/* Recruitment Status Section */}
        <section className="section">
          <h2>Recruitment Status</h2>
          <RecruitmentStatusPage />
        </section>

        {/* Job Posting Section */}
        <section className="section">
          <h2>Job Postings</h2>
          <JobForm />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
