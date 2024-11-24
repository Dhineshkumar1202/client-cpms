import React, { useEffect, useState } from "react";
import { getRecruitmentStatus } from "../../services/RecruitmentStatusService";  // API service

const RecruitmentStatus = () => {
  const [status, setStatus] = useState({
    totalInterviews: 0,
    totalOffers: 0,
    totalParticipants: 0,
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getRecruitmentStatus();
        setStatus(data);
      } catch (error) {
        console.error("Error fetching recruitment status:", error);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="recruitment-status">
      <h2>Recruitment Status</h2>
      <div className="status-card">
        <h3>Total Interviews</h3>
        <p>{status.totalInterviews}</p>
      </div>
      <div className="status-card">
        <h3>Total Offers</h3>
        <p>{status.totalOffers}</p>
      </div>
      <div className="status-card">
        <h3>Total Participants</h3>
        <p>{status.totalParticipants}</p>
      </div>
    </div>
  );
};

export default RecruitmentStatus;
