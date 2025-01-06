import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://cpmsapp-q59f2p6k.b4a.run/api/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJob(response.data);
      } catch (err) {
        setError("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);




  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://appcollege-jsbz09o3.b4a.run/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Job deleted successfully.");
      navigate("/job-listings");
    } catch (err) {
      alert("Failed to delete the job.");
    }
  };



  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>{error}</p>;

  
  return (
    <div>
      <h2>Job Details</h2>
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <p>Location: {job.location}</p>
      <p>Deadline: {job.applicationDeadline}</p>
      <button onClick={handleDelete}>Delete Job</button>
    </div>
  );
};

export default JobDetails;
