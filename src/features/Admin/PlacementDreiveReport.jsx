import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PlacementDriveReport = () => {
  const { driveId } = useParams(); 
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`https://appcollege-jsbz09o3.b4a.run/api/placement-drives/${driveId}/report`);
        setReport(response.data);
      } catch (error) {
        setMessage('Failed to fetch placement drive report');
      }
    };

    fetchReport();
  }, [driveId]);

  if (message) {
    return <div>{message}</div>;
  }

  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <div className="placement-drive-report">
      <h2>Placement Drive Report</h2>
      <h3>{report.title}</h3>
      <p><strong>Company:</strong> {report.company}</p>
      <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
      <p><strong>Participants:</strong> {report.participantsCount}</p>
      <p><strong>Interviews Conducted:</strong> {report.interviewsConducted}</p>
      <p><strong>Offers Made:</strong> {report.offersMade}</p>
    </div>
  );
};

export default PlacementDriveReport;
