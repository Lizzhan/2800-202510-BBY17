import { useEffect, useState } from 'react';
import RecipeCardGallery from '../components/recipecardgallery';
import UserLocation from '../components/UserLocation';

export default function home() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/auth/me', {
      method: 'GET',
      credentials: 'include', // 👈 important to include session cookie
    })
      .then(res => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      .then(data => setUsername(data.username))
      .catch(() => setUsername(''));
  }, []);



  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        {username ? `Welcome back, ${username}!` : 'Welcome back!'}
      </h1>
      <UserLocation />
      <h1 className="text-2xl font-semibold text-gray-800">
        Weekly Featured Recipes
      </h1>
      <RecipeCardGallery />
    </div>
  );
}