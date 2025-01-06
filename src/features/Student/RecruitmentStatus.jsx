import React, { useEffect, useState } from "react";
import { getRecruitmentStatus } from "../../services/RecruitmentStatusService";
import RecruitmentStatusCard from "./RecruitmentStatusCards";

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

  const cards = [
    {
      title: "Total Interviews",
      value: status.totalInterviews,
      color: "#4CAF50",
      icon: "fas fa-handshake",
    },
    {
      title: "Total Offers",
      value: status.totalOffers,
      color: "#2196F3", 
      icon: "fas fa-briefcase",
    },
    {
      title: "Total Participants",
      value: status.totalParticipants,
      color: "#FFC107", 
      icon: "fas fa-users",
    },
  ];

  return (
    <section className="recruitment-status">
      <h2>Recruitment Status</h2>
      <div className="status-cards">
        {cards.map((card, index) => (
          <RecruitmentStatusCard
            key={index}
            title={card.title}
            value={card.value}
            color={card.color}
            icon={card.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default RecruitmentStatus;
