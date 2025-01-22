import React, { useEffect, useState } from "react";
import { fetchJobs } from "../jobs/jobService";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs: ", error);
      }
    };
    loadJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Job Opportunities</h2>
      <input
        type="text"
        placeholder="Search by subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 border-gray-300 rounded-md shadow-sm w-full p-2"
      />
      <ul>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <li
              key={job._id}
              className="mb-4 p-4 bg-white shadow-md rounded-md"
            >
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-700">{job.description}</p>
              <p className="text-gray-500">Subject: {job.subject}</p>
              <p className="text-gray-500">Location: {job.location}</p>
              <p className="text-gray-500">
                Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
              </p>
            </li>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </ul>
    </div>
  );
};

export default JobListing;
