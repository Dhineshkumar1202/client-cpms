import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcademicRecords = ({ studentId }) => {
  const [academicData, setAcademicData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcademicRecords = async () => {
      try {
        const response = await axios.get(`https://appcollege-jsbz09o3.b4a.run/api/academic-records/${studentId}`);
        setAcademicData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching academic records", error);
        setLoading(false);
      }
    };

    fetchAcademicRecords();
  }, [studentId]);

  if (loading) return <div>Loading...</div>;

  if (!academicData) return <div>No Academic Records Found</div>;

  return (
    <div>
      <h2>Academic Records</h2>
      <div>
        <h3>Grades</h3>
        <ul>
          {Object.entries(academicData.grades).map(([subject, grade]) => (
            <li key={subject}>
              {subject}: {grade}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Achievements</h3>
        <ul>
          {academicData.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Transcripts</h3>
        <a href={academicData.transcripts} target="_blank" rel="noopener noreferrer">Download Transcript</a>
      </div>
    </div>
  );
};

export default AcademicRecords;
