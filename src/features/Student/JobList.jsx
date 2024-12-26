import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = () => {
  const [studentId, setStudentId] = useState('');
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`https://cpmsapp-q59f2p6k.b4a.run/api/applications/${studentId}`);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchApplications();
    }
  }, [studentId]);

  return (
    <div>
     <div className="joblist-container">
  <h1>Your Applications</h1>
  <input
    type="text"
    placeholder="Enter Student ID"
    value={studentId}
    onChange={(e) => setStudentId(e.target.value)}
  />
  <button onClick={fetchApplications}>Fetch Applications</button>

  <div>
    {applications.length > 0 ? (
      <ul>
        {applications.map((application) => (
          <li key={application._id}>
            <h3>Job ID: {application.jobId}</h3>
            <p>Status: {application.status}</p>
            <p>
              Resume: <a href={`https://appcollege-jsbz09o3.b4a.run/${application.resume}`} target="_blank" rel="noopener noreferrer">View Resume</a>
            </p>
            <p>Cover Letter: {application.coverLetter}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="no-applications">No applications found for this student.</p>
    )}
  </div>
</div>

    
    </div>
  );
};

export default JobList;
