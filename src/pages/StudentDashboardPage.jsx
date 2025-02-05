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
    <div className="student-dashboard p-8">
      <Navbar />

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to the Student Dashboard</h1>
      </header>

      {/* Dashboard Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card title="Applied Jobs" value={stats.appliedJobs} icon={<FaFileAlt />} />
        <Card title="Upcoming Interviews" value={stats.upcomingInterviews} icon={<FaCalendarCheck />} />
        <Card title="Selected Offers" value={stats.selectedOffers} icon={<FaCheckCircle />} />
      </section>

      {/* Apply for Job */}
      <section className="mb-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Apply for a Job</h2>
        <JobApplicationForm />
      </section>

      {/* Job Applications List */}
      <section>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Job Applications</h2>
        <JobApplicationList studentId={studentId} />
      </section>

      {/* JobListing */}
      <section>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">JobListings</h2>
        <JobListing />
      </section>
    </div>
  );
};

export default StudentDashboardPage;
