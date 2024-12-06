import React, { useState, useEffect } from "react";
import axios from "axios";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://appcollege-jsbz09o3.b4a.run/api/jobs/company", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(response.data);
    } catch (err) {
      console.error("Error fetching jobs:", err.response?.data || err.message);
      alert("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Your Job Listings</h2>
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length ? (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>
                Location: {job.location} | Deadline: {job.applicationDeadline}
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

export default JobListings;
