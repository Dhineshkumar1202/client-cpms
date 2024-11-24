import React, { useEffect, useState } from "react";
import RecruitmentStatusCard from "../features/RecruitmentStatus/RecruitmentStatusCards";  // Import the card component
import { getRecruitmentStatus } from "../services/RecruitmentStatusService";  // Service to fetch data

const RecruitmentStatusPage = () => {
  const [status, setStatus] = useState({
    totalInterviews: 0,
    totalOffers: 0,
    totalParticipants: 0,
  });

  // Fetch the status data when the page loads
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getRecruitmentStatus();  // Fetch status from API
        setStatus(data);
      } catch (error) {
        console.error("Error fetching recruitment status:", error);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="recruitment-status-page">
      <h1>Recruitment Status</h1>
      <div className="status-container">
        <RecruitmentStatusCard
          title="Total Interviews"
          value={status.totalInterviews}
          color="#007bff"
          icon="fas fa-calendar-check"  // Example icon
        />
        <RecruitmentStatusCard
          title="Total Offers"
          value={status.totalOffers}
          color="#28a745"
          icon="fas fa-check-circle"  // Example icon
        />
        <RecruitmentStatusCard
          title="Total Participants"
          value={status.totalParticipants}
          color="#ffc107"
          icon="fas fa-users"  // Example icon
        />
      </div>
    </div>
  );
};

export default RecruitmentStatusPage;
