import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    
    <div className="sidebar">
       <ul>
        <li><Link to="/dashboard/recruitment-status">Recruitment Status</Link></li>
        <li><Link to="/dashboard/manage-jobs">Manage Jobs</Link></li>
        <li><Link to="/dashboard/create-job">Create Job</Link></li>
        <li><Link to="/dashboard/interviews">Scheduled Interviews</Link></li>
      </ul>
    </div>
  );
};
export default Sidebar;
