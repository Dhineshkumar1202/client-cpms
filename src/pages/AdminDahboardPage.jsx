import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashBoardCard";
import AcademicRecords from "../features/Admin/AcademicRecords";
import PlacementDriveReport from "../features/Admin/PlacementDrive";
import RecruitmentStatusPage from "../features/Admin/RecruitmentStatusPage";
import JobForm from "../features/Admin/JobForm"; 
import JobPosting from "../features/Admin/JobPosting";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    studentsPlaced: 0,
    drivesConducted: 0,
    offersMade: 0,
    activePlacements: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found! User is not authenticated.");
      navigate("/login"); // Redirect to login page
      return;
    }

    fetch("https://cpmsapp-q59f2p6k.b4a.run/dashboard-stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Send token for authentication
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }
        return response.json();
      })
      .then((data) => setStats(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();  // Ensures full UI reset
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
          <DashboardCard title="Total Students Placed" value={stats.studentsPlaced} color="blue" icon="fa-user-check" />
          <DashboardCard title="Total Drives Conducted" value={stats.drivesConducted} color="green" icon="fa-calendar-check" />
          <DashboardCard title="Total Offers Made" value={stats.offersMade} color="yellow" icon="fa-check-circle" />
          <DashboardCard title="Active Placements" value={stats.activePlacements} color="red" icon="fa-users" />
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
          <JobPosting /> {/* Now included */}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
