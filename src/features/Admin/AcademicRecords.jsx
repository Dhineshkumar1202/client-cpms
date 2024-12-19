import React, { useEffect, useState } from "react";
import axios from "axios";

const AcademicRecords = ({ studentId }) => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`https://appcollege-jsbz0903.b4a.run/api/academic-records/${studentId}`);
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching academic records:", error.response || error.message);
        setError("Failed to fetch academic records. Please try again later.");
      }
    };

    fetchRecords();
  }, [studentId]);

  if (error) return <p>{error}</p>;
  return (
    <div>
      <h3>Academic Records</h3>
      <ul>
        {records.map((record, index) => (
          <li key={index}>{record}</li>
        ))}
      </ul>
    </div>
  );
};

export default AcademicRecords;
