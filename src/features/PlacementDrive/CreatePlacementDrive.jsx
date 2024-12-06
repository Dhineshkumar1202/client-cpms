import React, { useState } from 'react';
import axios from 'axios';

const CreatePlacementDrive = () => {
  const [companyId, setCompanyId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://appcollege-jsbz09o3.b4a.run/api/placement-drives/create', {
        companyId,
        title,
        description,
        date,
        location,
      });

      setMessage('Placement drive created successfully!');
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
    } catch (error) {
      setMessage('Failed to create placement drive.');
    }
  };

  return (
    <div className="create-placement-drive">
      <h2>Create Placement Drive</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyId">Company ID</label>
          <input
            type="text"
            id="companyId"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Placement Drive</button>
      </form>
    </div>
  );
};

export default CreatePlacementDrive;
