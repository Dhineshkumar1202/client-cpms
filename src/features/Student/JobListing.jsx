import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
   
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://cpmsapp-q59f2p6k.b4a.run/api/jobs'); 
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching jobs:', err.message);
      }
    };

    fetchJobs();
  }, []);

 
  const filteredJobs = jobs.filter((job) =>
    job.subject.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by subject"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredJobs.map((job) => (
          <li key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Subject: {job.subject}</p>
            <button onClick={() => handleApply(job._id)}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );

};

export default JobListing;
