import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import AcademicRecords from "../features/Admin/AcademicRecords";
import PlacementDriveReport from "../features/Admin/PlacementDrive";
import RecruitmentStatusPage from "../features/Admin/RecruitmentStatusPage";
import JobForm from "../features/Admin/JobForm";
import { FaUserCheck, FaCalendarCheck, FaCheckCircle, FaUsers } from "react-icons/fa";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    placedStudents: 0,
    totalDrives: 0,
    totalOffers: 0,
    activePlacements: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setStats({
        placedStudents: 150,
        totalDrives: 20,
        totalOffers: 100,
        activePlacements: 50
      });
    }, 1000);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar added */}
      <div className="flex-1 p-8">
        <Navbar onLogout={handleLogout} /> {/* Navbar added */}

        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to the Admin Dashboard</h1>
        </header>

        {/* Dashboard Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Total Students Placed" value={stats.placedStudents} icon={<FaUserCheck />} />
          <Card title="Total Drives Conducted" value={stats.totalDrives} icon={<FaCalendarCheck />} />
          <Card title="Total Offers Made" value={stats.totalOffers} icon={<FaCheckCircle />} />
          <Card title="Active Placements" value={stats.activePlacements} icon={<FaUsers />} />
        </section>

        {/* Sections */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Academic Records</h2>
          <AcademicRecords studentId="12345" />
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Placement Drive Report</h2>
          <PlacementDriveReport />
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Recruitment Status</h2>
          <RecruitmentStatusPage />
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Job Postings</h2>
          <JobForm />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
