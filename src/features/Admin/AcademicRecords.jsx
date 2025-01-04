import React, { useEffect, useState } from "react";
import axios from "axios";

const AcademicRecords = ({ studentId }) => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        console.log("Fetching records for studentId:", studentId);

        const response = await axios.get(
          `https://cpmsapp-q59f2p6k.b4a.run/api/academic-records/${studentId}`
        );

        console.log("API Response:", response.data);

        setRecords(response.data);
        setError(null);
      } catch (error) {
        console.error(
          "Error fetching academic records:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
          "Failed to fetch academic records. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [studentId]);

  if (loading) return <p>Loading academic records...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Academic Records</h3>
      {records.length > 0 ? (
        <ul className="list-disc ml-5">
          {records.map((record, index) => (
            <li key={index}>
              <strong>Course:</strong> {record.course}, <strong>Grade:</strong> {record.grade}, <strong>Year:</strong> {record.year}
            </li>
          ))}
        </ul>
      ) : (
        <p>No academic records found for this student.</p>
      )}
    </div>
  );
};

export default AcademicRecords;
