import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>CPMS</h2>
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? '×' : '≡'}
        </div>
      </div>

      <ul className="sidebar-menu">
        <li onClick={() => navigate('/dashboard')}>Dashboard</li>
        <li onClick={() => navigate('/manage-jobs')}>Manage Jobs</li>
        <li onClick={() => navigate('/applications')}>Applications</li>
        <li onClick={() => navigate('/interviews')}>Interviews</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
