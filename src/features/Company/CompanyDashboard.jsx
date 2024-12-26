import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CompanyDashboard = () => {
  const [company, setCompany] = useState(null);
  const [jobStats, setJobStats] = useState({ totalJobs: 0, totalApplications: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

    
        const companyResponse = await axios.get("https://cpmsapp-q59f2p6k.b4a.run/api/company/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompany(companyResponse.data);

    
        const statsResponse = await axios.get("https://cpmsapp-q59f2p6k.b4a.run/api/company/dashboard-stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobStats(statsResponse.data);
      } catch (err) {
        console.error("Error loading dashboard data:", err.message);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="company-dashboard">
      <h1>Welcome, {company?.name || "Company"}</h1>
      <p>Location: {company?.location || "N/A"}</p>
      <p>Email: {company?.email || "N/A"}</p>

      <div className="dashboard-stats">
        <div className="stat-item">
          <h3>Total Job Postings</h3>
          <p>{jobStats?.totalJobs || 0}</p>
          <Link to="/job-listings">Manage Job Postings</Link>
        </div>
        <div className="stat-item">
          <h3>Total Applications</h3>
          <p>{jobStats?.totalApplications || 0}</p>
          <Link to="/applications">Review Applications</Link>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <Link to="/job-postings" className="action-btn">
            Post a New Job
          </Link>
          <Link to="/profile" className="action-btn">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
