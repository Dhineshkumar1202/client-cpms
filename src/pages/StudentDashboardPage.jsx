import React from "react";
import Navbar from "../components/Navbar";
import JobApplicationForm from "../features/Student/JobApplicationForm";
import JobApplicationList from "../features/Student/JobApplicationList";

const StudentDashboardPage = () => {
  const studentId = "12345"; 

  return (
    <div>
      <Navbar />
      <main className="p-4">
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Apply for a Job</h2>
          <JobApplicationForm />
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Your Job Applications</h2>
          <JobApplicationList studentId={studentId} />
        </section>
      </main>
    </div>
  );
};

export default StudentDashboardPage;
