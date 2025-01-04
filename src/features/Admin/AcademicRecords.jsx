import React, { useEffect, useState } from "react";
import axios from "axios";

const AcademicRecords = ({ studentId }) => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added a loading state

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // Log the studentId being used for debugging
        console.log("Fetching records for studentId:", studentId);

        const response = await axios.get(
          `https://cpmsapp-q59f2p6k.b4a.run/api/academic-records/${studentId}`
        );

        // Log the API response for debugging
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data)) {
          setRecords(response.data);
        } else {
          setRecords([]);
        }
      } catch (error) {
        console.error(
          "Error fetching academic records:",
          error.response || error.message
        );
        setError("Failed to fetch academic records. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchRecords();
  }, [studentId]);

  // Handle loading state
  if (loading) return <p>Loading academic records...</p>;

  // Handle error state
  if (error) return <p>{error}</p>;

  // Render records or a message if none are found
  return (
    <div>
      <h3>Academic Records</h3>
      {records.length > 0 ? (
        <ul>
          {records.map((record, index) => (
            <li key={index}>{record}</li>
          ))}
        </ul>
      ) : (
        <p>No academic records found for this student.</p>
      )}
    </div>
  );
};

export default AcademicRecords;
