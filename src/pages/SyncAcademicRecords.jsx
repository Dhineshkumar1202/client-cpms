import React, { useState } from 'react';
import { syncAcademicRecords } from '../services/academicService';

const SyncAcademicRecords = ({ studentId }) => {
  const [records, setRecords] = useState({ grade: '', achievements: '', transcriptUrl: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRecords = await syncAcademicRecords(studentId, records);
      setStatus('Successfully synced academic records!');
      setRecords(updatedRecords);
    } catch (error) {
      setStatus('Error syncing academic records');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sync Academic Records</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Grade: </label>
          <input
            type="text"
            value={records.grade}
            onChange={(e) => setRecords({ ...records, grade: e.target.value })}
          />
        </div>
        <div>
          <label>Achievements: </label>
          <input
            type="text"
            value={records.achievements}
            onChange={(e) => setRecords({ ...records, achievements: e.target.value })}
          />
        </div>
        <div>
          <label>Transcript URL: </label>
          <input
            type="url"
            value={records.transcriptUrl}
            onChange={(e) => setRecords({ ...records, transcriptUrl: e.target.value })}
          />
        </div>
        <button type="submit">Sync Records</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
};

export default SyncAcademicRecords;
