import React, { useState } from 'react';
import axios from 'axios';

const JobForm = () => {
  const [studentId, setStudentId] = useState('');
  const [jobId, setJobId] = useState('');
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert('Please upload your resume.');
      return;
    }

    const formData = new FormData();
    formData.append('file', resume); 
    formData.append('studentId', studentId);
    formData.append('jobId', jobId);
    formData.append('coverLetter', coverLetter);

    try {
      const response = await axios.post('https://cpmsapp-q59f2p6k.b4a.run', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      alert('Application submitted successfully');
  } catch (error) {
      console.error('Error:', error.message); 
      console.error('Error Details:', error.response || error.config); 
      alert('Failed to submit application. Please try again.');
  }
  
  };

  return (
    <section className="apply-jobs">
      <h1>Submit Your Application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Job ID:</label>
          <input
            type="text"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Resume:</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Cover Letter:</label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </section>
  );
};

export default JobForm;
