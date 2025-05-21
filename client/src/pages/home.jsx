import { useEffect, useState } from 'react';
import RecipeCardGallery from '../components/recipecardgallery';
import UserLocation from '../components/UserLocation';

/**
 * a simple home page that displays some featured recipe from the database. 
 * @author Lucas Liu
 */
export default function home() {
  //state used for username
  const [username, setUsername] = useState('');

  //fetch the ussername from the back end
  useEffect(() => {
    fetch('http://localhost:3000/api/auth/me', {
      method: 'GET',
      credentials: 'include', 
    })
      .then(res => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      //set the username for the user
      .then(data => setUsername(data.username))
      .catch(() => setUsername(''));
  }, []);


  //render the home page.
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
      <div className="space-y-1">
      <h1 className="text-3xl font-bold text-gray-900">
        {username ? `Welcome back, ${username}!` : 'Welcome back!'}
      </h1>
      <UserLocation />
    </div>
      <h1 className="text-2xl font-semibold text-gray-800">
        Try a Featured Favourite!
      </h1>
      <RecipeCardGallery />
    </div>
  );
}