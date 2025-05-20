import { React, useState, useEffect } from 'react';
import axios from 'axios';
import UserLocation from '../components/UserLocation';

const UserProfile = () => {
  const [inputs, setInputs] = useState({
    email: 'example@ex.com',
    username: 'Ichiban',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/me', {
          withCredentials: true,
        });
        setInputs(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full flex flex-col md:flex-row gap-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src="/remy.webp"
            alt="User avatar"
            className="w-32 h-32 rounded-full border-4 border-kaidBrown object-cover"
          />
          <p className="mt-4 text-gray-700 font-medium text-lg">Bone Apple Tea, {inputs.username}</p>
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
            <div className="text-gray-800 bg-gray-100 rounded px-3 py-2">{inputs.email}</div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Location</label>
            <div className="text-gray-800 bg-gray-100 rounded px-3 py-2">
              <UserLocation />
            </div>
          </div>

          {/* Future: Add more fields here, like School, etc. */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;