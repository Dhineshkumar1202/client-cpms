import React, { useState } from "react";
import axios from "axios";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student", // Default role
        additionalData: {},
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (["course", "year", "department", "companyName", "website"].includes(name)) {
            // Handle additional data fields
            setFormData({
                ...formData,
                additionalData: { ...formData.additionalData, [name]: value },
            });
        } else {
            // Handle main form fields
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Error signing up.");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8">
            <h1 className="text-xl font-bold mb-4">Signup</h1>
            {message && <p className="text-green-500 mb-4">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                        <option value="company">Company</option>
                    </select>
                </div>
                {/* Conditional Fields Based on Role */}
                {formData.role === "student" && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Course</label>
                            <input
                                type="text"
                                name="course"
                                value={formData.additionalData.course || ""}
                                onChange={handleChange}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                            <input
                                type="number"
                                name="year"
                                value={formData.additionalData.year || ""}
                                onChange={handleChange}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </>
                )}
                {formData.role === "admin" && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Department</label>
                        <input
                            type="text"
                            name="department"
                            value={formData.additionalData.department || ""}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                )}
                {formData.role === "company" && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.additionalData.companyName || ""}
                                onChange={handleChange}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Website</label>
                            <input
                                type="url"
                                name="website"
                                value={formData.additionalData.website || ""}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </>
                )}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Signup
                </button>
            </form>
        </div>
    );
};

export default SignupForm;
