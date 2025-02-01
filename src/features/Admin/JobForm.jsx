import React, { useEffect, useState } from "react";

const JobPosting = () => {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No token found! User is not authenticated.");
      return;
    }

    fetch("https://cpmsapp-q59f2p6k.b4a.run/job-postings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("User is not authenticated");
        }
        return response.json();
      })
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, [token]);

  return (
    <div>
      <h2>Job Listings</h2>
      <ul>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <li key={job._id}>{job.title} - {job.company}</li>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </ul>
    </div>
  );
};

export default JobPosting;
