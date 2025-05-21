import { useEffect, useState } from 'react';
import RecipeCardGallery from '../components/recipecardgallery';
import UserLocation from '../components/UserLocation';

/**
 * The Home page of the application.
 * Displays a personalized welcome message, the user's current location,
 * and a gallery of featured favorite recipes from the database.
 * 
 * User session data is fetched from the backend to display the username.
 *
 * @returns {JSX.Element} A complete home view with greeting and featured recipes.
 *
 * @author Lucas Liu
 */
export default function home() {
  // State to store the current user's username
  const [username, setUsername] = useState('');

  // Fetch the logged-in user's information from the backend
  useEffect(() => {
    fetch('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com:3000/api/auth/me', {
      method: 'GET',
      credentials: 'include', // includes cookies for authentication
    })
      .then(res => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      .then(data => setUsername(data.username)) // Set the username on success
      .catch(() => setUsername('')); // Clear username on failure
  }, []);

  // Render the home page layout
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
      <div className="space-y-1">
        {/* Welcome message and user location */}
        <h1 className="text-3xl font-bold text-gray-900">
          {username ? `Welcome back, ${username}!` : 'Welcome back!'}
        </h1>
        <UserLocation />
      </div>

      {/* Featured recipe section */}
      <h1 className="text-2xl font-semibold text-gray-800">
        Try a Featured Favourite!
      </h1>
      <RecipeCardGallery />
    </div>
  );
}
