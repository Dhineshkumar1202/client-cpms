import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        role: 'student', // Default to student, can be changed to other roles
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://appcollege-jsbz09o3.b4a.run/auth/login', credentials);
            localStorage.setItem('token', response.data.token); // Save the JWT token in localStorage
            alert('Login successful!');
            navigate('/dashboard');  // Redirect to dashboard or main page
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong!');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select name="role" value={credentials.role} onChange={handleChange}>
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                        <option value="company">Company</option>
                    </select>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
