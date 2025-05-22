import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * Registration page component for new users
 * Handles user input, form submission, and navigation on success
 * code taken from personal experience
 * @author Leslie Zhang 
 */
const Register = () => {
  // State to track form input values
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: ""
  });

  // State to display any server-side or validation error
  const [err, setErr] = useState(null);

  const navigate = useNavigate(); // for redirecting after registration

  // Update form state when user types into any input field
  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to backend API
      await axios.post("https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/auth/register", inputs);

      // Navigate to login page if successful
      navigate('/login');
    } catch (err) {
      // Set error message from server or a generic one
      setErr(err.response?.data || 'Something went wrong');
      console.log(err); // Optional: helpful for debugging
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        {/* Form Title */}
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">Register</h1>

        {/* Registration Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Username Field */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          {/* Email Field */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          {/* Password Field */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200"
          >
            Register
          </button>

          {/* Error Message */}
          {err && <p className="text-red-500 text-sm text-center">{err}</p>}

          {/* Link to Login Page */}
          <span className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-500 hover:underline">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
