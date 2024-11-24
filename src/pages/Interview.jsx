import React, { useState } from 'react';
import { scheduleInterview } from '../services/api';

const Interviews = () => {
    const [interview, setInterview] = useState({
        applicationId: '',
        date: '',
        location: '',
    });

    const handleSchedule = async (e) => {
        e.preventDefault();
        try {
            const { data } = await scheduleInterview(interview);
            alert('Interview scheduled successfully!');
            setInterview({ applicationId: '', date: '', location: '' });
        } catch (error) {
            console.error('Error scheduling interview:', error.message);
        }
    };

    return (
        <div>
            <h2>Schedule Interview</h2>
            <form onSubmit={handleSchedule}>
                <input
                    type="text"
                    placeholder="Application ID"
                    value={interview.applicationId}
                    onChange={(e) => setInterview({ ...interview, applicationId: e.target.value })}
                    required
                />
                <input
                    type="datetime-local"
                    value={interview.date}
                    onChange={(e) => setInterview({ ...interview, date: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={interview.location}
                    onChange={(e) => setInterview({ ...interview, location: e.target.value })}
                    required
                />
                <button type="submit">Schedule Interview</button>
            </form>
        </div>
    );
};

export default Interviews;
