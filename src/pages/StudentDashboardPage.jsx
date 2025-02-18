import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card"; 
import JobApplicationForm from "../features/Student/JobApplicationForm";
import JobApplicationList from "../features/Student/JobApplicationList";
import { FaFileAlt, FaCalendarCheck, FaCheckCircle } from "react-icons/fa"; 
import JobListing from "../features/Student/JobListing";

const StudentDashboardPage = () => {
  const studentId = "12345";

  // State for dynamic data
  const [stats, setStats] = useState({
    appliedJobs: 0,
    upcomingInterviews: 0,
    selectedOffers: 0,
  });

  useEffect(() => {
    // Simulated API fetch (Replace with actual API calls)
    setTimeout(() => {
      setStats({
        appliedJobs: 5,
        upcomingInterviews: 2,
        selectedOffers: 1,
      });
    }, 1000);
  }, []);

  return (
    <div style={{ padding: "32px" }}>
      <Navbar />

      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#2d3748" }}>
          Welcome to the Student Dashboard
        </h1>
      </header>

      {/* Dashboard Cards */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <Card title="Applied Jobs" value={stats.appliedJobs} icon={<FaFileAlt />} />
        <Card title="Upcoming Interviews" value={stats.upcomingInterviews} icon={<FaCalendarCheck />} />
        <Card title="Selected Offers" value={stats.selectedOffers} icon={<FaCheckCircle />} />
      </section>

      {/* Apply for Job */}
      <section style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#4a5568", marginBottom: "16px" }}>
          Apply for a Job
        </h2>
        <JobApplicationForm />
      </section>

      {/* Job Applications List */}
      <section>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#4a5568", marginBottom: "16px" }}>
          Your Job Applications
        </h2>
        <JobApplicationList studentId={studentId} />
      </section>

      {/* Job Listings */}
      <section>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#4a5568", marginBottom: "16px" }}>
          Job Listings
        </h2>
        <JobListing />
      </section>
    </div>
  );
};

export default StudentDashboardPage;
