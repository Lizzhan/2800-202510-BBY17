import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: ""
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://two800-202510-bby17.onrender.com/api/auth/register", inputs);
      navigate('/login');
    } catch (err) {
      setErr(err.response?.data || 'Something went wrong');
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">Register</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200"
          >
            Register
          </button>
          {err && <p className="text-red-500 text-sm text-center">{err}</p>}
          <span className="text-center text-sm text-gray-600">
            No account?{' '}
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
