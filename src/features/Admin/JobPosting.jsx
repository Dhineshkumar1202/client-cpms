import React, { useEffect, useState } from "react";
import { fetchJobs } from "../../services/jobService";
import JobForm from "./JobForm";

const JobPosting = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const data = await fetchJobs();
        setJobs(data);
      } catch (error) {
        setError("❌ Error fetching jobs: " + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };
    
    loadJobs();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Manage Job Postings</h2>

      {/* Job Creation Form */}
      <JobForm />

      {/* Job Listing */}
      <h3 className="text-xl font-semibold mt-8">Posted Jobs</h3>

      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : jobs.length > 0 ? (
        <ul className="mt-4">
          {jobs.map((job) => (
            <li key={job._id} className="mb-4 p-4 bg-white shadow-md rounded-md">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-700">{job.description}</p>
              <p className="text-gray-500">Subject: {job.subject}</p>
              <p className="text-gray-500">Location: {job.location}</p>
              <p className="text-gray-500">
                Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default JobPosting;
