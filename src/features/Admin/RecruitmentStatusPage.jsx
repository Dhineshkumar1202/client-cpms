import React, { useEffect, useState } from "react";
import RecruitmentStatusCard from "../Student/RecruitmentStatusCards";  
import { getRecruitmentStatus } from "../../services/RecruitmentStatusService";  

const RecruitmentStatusPage = () => {
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
    <div className="recruitment-status-page">
      <div className="status-container">
        <RecruitmentStatusCard
          title="Total Interviews"
          value={status.totalInterviews}
          color="#007bff"
          icon="fas fa-calendar-check"  
        />
        <RecruitmentStatusCard
          title="Total Offers"
          value={status.totalOffers}
          color="#28a745"
          icon="fas fa-check-circle"  
        />
        <RecruitmentStatusCard
          title="Total Participants"
          value={status.totalParticipants}
          color="#ffc107"
          icon="fas fa-users" 
        />
      </div>
    </div>
  );
};

export default RecruitmentStatusPage;
