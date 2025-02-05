import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import AcademicRecords from "../features/Admin/AcademicRecords";
import PlacementDriveReport from "../features/Admin/PlacementDrive";
import RecruitmentStatusPage from "../features/Admin/RecruitmentStatusPage";
import JobForm from "../features/Admin/JobForm";
import { FaUserCheck, FaCalendarCheck, FaCheckCircle, FaUsers } from "react-icons/fa";
import JobApplicationForm from "../features/Student/JobApplicationForm";
import JobApplicationList from "../features/Student/JobApplicationList";
import JobListing from "../features/Student/JobListing";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    placedStudents: 0,
    totalDrives: 0,
    totalOffers: 0,
    activePlacements: 0,
  });

  useEffect(() => {
    fetch("https://cpmsapp-q59f2p6k.b4a.run/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching admin stats:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard p-8">
      <Navbar onLogout={handleLogout} />
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Students Placed" value={stats.placedStudents} icon={<FaUserCheck />} />
        <Card title="Total Drives Conducted" value={stats.totalDrives} icon={<FaCalendarCheck />} />
        <Card title="Total Offers Made" value={stats.totalOffers} icon={<FaCheckCircle />} />
        <Card title="Active Placements" value={stats.activePlacements} icon={<FaUsers />} />
      </section>
      <PlacementDriveReport />
      <RecruitmentStatusPage />
      <JobForm />
    </div>
  );
};

const StudentDashboardPage = () => {
  const [studentId, setStudentId] = useState(null);
  const [stats, setStats] = useState({
    appliedJobs: 0,
    upcomingInterviews: 0,
    selectedOffers: 0,
  });

  useEffect(() => {
    const storedId = localStorage.getItem("studentId");
    if (storedId) {
      setStudentId(storedId);
      fetch(`https://cpmsapp-q59f2p6k.b4a.run/api/student/stats/${storedId}`)
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch((err) => console.error("Error fetching student stats:", err));
    }
  }, []);

  return (
    <div className="student-dashboard p-8">
      <Navbar />
      <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card title="Applied Jobs" value={stats.appliedJobs} icon={<FaFileAlt />} />
        <Card title="Upcoming Interviews" value={stats.upcomingInterviews} icon={<FaCalendarCheck />} />
        <Card title="Selected Offers" value={stats.selectedOffers} icon={<FaCheckCircle />} />
      </section>
      <JobApplicationForm studentId={studentId} />
      <JobApplicationList studentId={studentId} />
      <JobListing />
    </div>
  );
};

export { AdminDashboardPage, StudentDashboardPage };
