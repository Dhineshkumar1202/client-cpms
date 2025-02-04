import React, { useState } from "react";
import axios from "axios";
import "../styles/signup.css"


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

    const [errors, setErrors] = useState({});

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

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Name is required.";
        if (!formData.email.trim()) errors.email = "Email is required.";
        if (!formData.password.trim()) errors.password = "Password is required.";
        if (formData.role === "student" && !formData.additionalData.course.trim())
            errors.course = "Course is required for students.";
        if (formData.role === "student" && !formData.additionalData.year)
            errors.year = "Year is required for students.";
        if (formData.role === "company" && !formData.additionalData.companyName.trim())
            errors.companyName = "Company name is required for companies.";
        if (formData.role === "company" && !formData.additionalData.website.trim())
            errors.website = "Website is required for companies.";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await axios.post("https://cpmsapp-q59f2p6k.b4a.run/api/auth/signup", formData);
            alert("Signup successful!");
            console.log(response.data);
            setFormData({
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
            setErrors({});
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed. Check the console for more details.");
        }
    };

    return (
        <div className="signup-page">
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-label="Name"
                    required
                />
                {errors.name && <span className="error">{errors.name}</span>}

                <input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-label="Email"
                    required
                />
                {errors.email && <span className="error">{errors.email}</span>}

                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    aria-label="Password"
                    required
                />
                {errors.password && <span className="error">{errors.password}</span>}

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    aria-label="Role"
                >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="company">Company</option>
                </select>

                {formData.role === "student" && (
                    <>
                        <select
                            name="additionalData.course"
                            value={formData.additionalData.course}
                            onChange={handleChange}
                            aria-label="Course"
                         >
                    <option>Select your course</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics</option>
                    <option value="EMechanical">Mechanical</option>
                </select>

                        {errors.course && <span className="error">{errors.course}</span>}

                        <select
                            name="additionalData.year"
                            placeholder="Year"
                            type="Year"
                            value={formData.additionalData.year}
                            onChange={handleChange}
                            aria-label="Year"

                            >
                    <option>Course Duration</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    </select>
                        {errors.year && <span className="error">{errors.year}</span>}
                    </>
                )}

                {formData.role === "admin" && (
                    <input
                        name="additionalData.department"
                        placeholder="Department"
                        value={formData.additionalData.department}
                        onChange={handleChange}
                        aria-label="Department"
                    />
                )}

                {formData.role === "company" && (
                    <>
                        <input
                            name="additionalData.companyName"
                            placeholder="Company Name"
                            value={formData.additionalData.companyName}
                            onChange={handleChange}
                            aria-label="Company Name"
                        />
                        {errors.companyName && <span className="error">{errors.companyName}</span>}

                        <input
                            name="additionalData.website"
                            placeholder="Website"
                            value={formData.additionalData.website}
                            onChange={handleChange}
                            aria-label="Website"
                        />
                        {errors.website && <span className="error">{errors.website}</span>}
                    </>
                )}

                <button type="submit">Sign Up</button>

                <div className="login-link">
                    Already have an account? <a href="/login">Log in</a>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;
