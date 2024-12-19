import React, { useState } from "react";
import axios from "axios";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
        additionalData: {
            course: "",
            year: "",
            department: "",
            companyName: "",
            website: "",
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("additionalData.")) {
            const field = name.split(".")[1];
            setFormData({
                ...formData,
                additionalData: {
                    ...formData.additionalData,
                    [field]: value,
                },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://cpmsapp-q59f2p6k.b4a.run/api/auth/signup", formData);
            alert("Signup successful!");
            console.log(response.data);
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed. Check the console for more details.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required />
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="company">Company</option>
            </select>
            {formData.role === "student" && (
                <>
                    <input name="additionalData.course" placeholder="Course" value={formData.additionalData.course} onChange={handleChange} />
                    <input name="additionalData.year" placeholder="Year" type="number" value={formData.additionalData.year} onChange={handleChange} />
                </>
            )}
            {formData.role === "admin" && (
                <input name="additionalData.department" placeholder="Department" value={formData.additionalData.department} onChange={handleChange} />
            )}
            {formData.role === "company" && (
                <>
                    <input name="additionalData.companyName" placeholder="Company Name" value={formData.additionalData.companyName} onChange={handleChange} />
                    <input name="additionalData.website" placeholder="Website" value={formData.additionalData.website} onChange={handleChange} />
                </>
            )}
            <button type="submit">Sign Up</button>
            
<div className="login-link">
    Already have an account? <a href="/login">Log in</a>
</div>

        </form>
    );
};

export default SignupPage;
