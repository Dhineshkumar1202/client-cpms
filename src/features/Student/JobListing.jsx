import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/Card"; 

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://cpmsapp-q59f2p6k.b4a.run/api/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch jobs. Please try again later.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

  const filteredJobs = jobs.filter((job) =>
    job.subject.toLowerCase().includes(filter.toLowerCase())
  );

  const handleApply = (jobId) => {
    alert(`Applied for job with ID: ${jobId}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Title */}
      <div className="flex items-center space-x-2 mb-4">
        <span>💼</span>
        {/* <h2 className="text-xl font-bold">Job Listings</h2> */}
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Filter by subject"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 pl-10 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500">Loading jobs...</p>}

      {/* Error State */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Job Cards */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card
              key={job._id}
              title={job.title}
              description={job.description}
              subject={job.subject}
              onApply={() => handleApply(job._id)}
            />
          ))
        ) : (
          !loading && (
            <p className="text-center text-gray-500">No jobs found for the given subject.</p>
          )
        )}
      </div>
    </div>
  );
};

export default JobListing;
