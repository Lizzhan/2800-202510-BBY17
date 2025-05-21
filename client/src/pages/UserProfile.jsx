import { React, useState, useEffect } from 'react';
import axios from 'axios';
import UserLocation from '../components/UserLocation';

/**
 * User profile page that displays current user's basic info.
 * Fetches user data from the server using a session cookie.
 * code made from personal experience
 * @author Leslie Zhang
 */
const UserProfile = () => {
  // Initial dummy state for fallback before API returns
  const [inputs, setInputs] = useState({
    email: 'example@ex.com',
    username: 'Ichiban',
  });

  // Fetch user info once on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        // Request user session data from backend
        const res = await axios.get('http://localhost:3000/api/auth/me', {
          withCredentials: true,
        });
        setInputs(res.data); // Update state with response
      } catch (err) {
        console.log(err); // Log any error
      }
    };

    getData(); // Run fetch function
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full flex flex-col md:flex-row gap-8">
        
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center">
          <img
            src="/remy.webp"
            alt="User avatar"
            className="w-32 h-32 rounded-full border-4 border-kaidBrown object-cover"
          />
          <p className="mt-4 text-gray-700 font-medium text-lg">
            Bone Apple Tea, {inputs.username}
          </p>
        </div>

        {/* Profile Details Section */}
        <div className="flex-1 space-y-4">

          {/* Email Display */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
            <div className="text-gray-800 bg-gray-100 rounded px-3 py-2">{inputs.email}</div>
          </div>

          {/* Location (Dynamic via Component) */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Location</label>
            <div className="text-gray-800 bg-gray-100 rounded px-3 py-2">
              <UserLocation /> {/* Component handles location fetching */}
            </div>
          </div>

          {/* 🛠️ Future fields can go here, like school, bio, etc. */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
