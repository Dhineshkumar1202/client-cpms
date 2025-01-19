import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://cpmsapp-q59f2p6k.b4a.run/api/jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
      } catch (err) {
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

  const filteredJobs = jobs.filter((job) =>
    job.subject.toLowerCase().includes(filter.toLowerCase())
  );

  const handleApply = (jobId) => {
    alert(`Applied to job with ID: ${jobId}`);
  };

  if (loading) return <p className="loading">Loading jobs...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="job-listing">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by subject"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>
      <ul className="job-list">
        {filteredJobs.map((job) => (
          <li key={job._id} className="job-card">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-description">{job.description}</p>
            <p className="job-subject">Subject: {job.subject}</p>
            <button onClick={() => handleApply(job._id)} className="apply-button">
              Apply
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobListing;
