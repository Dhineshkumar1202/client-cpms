import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 

const JobUpdateForm = () => {
  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    company: '',
  });
  const navigate = useNavigate(); 
  const { jobId } = useParams(); 


  useEffect(() => {
   
    fetch(`https://cpmsapp-q59f2p6k.b4a.run/api/jobs/${jobId}`)
      .then(response => response.json())
      .then(data => setJob(data))
      .catch(error => console.error('Error fetching job details:', error));
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    fetch(`https://cpmsapp-q59f2p6k.b4a.run/api/jobs/${jobId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Job updated successfully:', data);
        navigate('/jobs'); 
      })
      .catch(error => console.error('Error updating job:', error));
  };



  
  return (
    <div>
      <h1>Update Job</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Job Title:
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Job Description:
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Job Location:
          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Company:
          <input
            type="text"
            name="company"
            value={job.company}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update Job</button>
      </form>
    </div>
  );
};

export default JobUpdateForm;
