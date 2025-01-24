import React, { useEffect, useState } from "react";
import axios from "axios";

const JobApplicationList = ({ studentId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`https://cpmsapp-q59f2p6k.b4a.run/api/job-applications/student/${studentId}`);
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [studentId]);

  if (loading) {
    return <p>Loading applications...</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4"></h2>
      {applications.length > 0 ? (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app._id} className="p-4 border rounded-lg">
              <p><strong>Job ID:</strong> {app.jobId}</p>
              <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
              <p>
                <strong>Resume:</strong>{" "}
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Resume
                </a>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
};

export default JobApplicationList;
