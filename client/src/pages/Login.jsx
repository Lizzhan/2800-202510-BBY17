// Import React and required hooks
import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // for navigation and routing
import axios from 'axios'; // for HTTP requests
import { useAuth } from '../context/AuthContext'; // custom auth context

/**
 * Login page component code was used from personal experience
 * @author Leslie Zhang
 */
const Login = () => {
  // State for form inputs
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });

  // State to track any login errors
  const [err, setErr] = useState(null);

  const { login } = useAuth(); // Get login function from context
  const navigate = useNavigate(); // Router navigation function

  // Handle input field changes
  const handleChange = (e) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const res = await axios.post("https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/auth/login", inputs, {
        withCredentials: true, // send cookies
      });

      login(res.data); // set user context
      console.log(res.data); // debug: log user info
      navigate("/"); // redirect to home on success
    } catch (err) {
      setErr(err.response.data); // show error message
      console.log(err); // debug: log full error
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {/* Login form container */}
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">Login</h1>
        <form className="flex flex-col gap-4">
          {/* Username input */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {/* Password input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {/* Login button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200"
          >
            Login
          </button>
          {/* Error message display */}
          {err && <p className="text-red-500 text-sm text-center">{err}</p>}
          {/* Register redirect link */}
          <span className="text-center text-sm text-gray-600">
            No account?{' '}
            <Link to="/register" className="text-indigo-500 hover:underline">
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
