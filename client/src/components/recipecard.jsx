import React, { useState } from 'react';

const initialRecipes = [
  {
    image: 'https://source.unsplash.com/featured/?basil,chicken',
    title: 'Crispy Basil Chicken',
  },
  {
    image: 'https://source.unsplash.com/featured/?sweet-potato,stew',
    title: 'Sweet Potato Stew',
  },
  {
    image: 'https://source.unsplash.com/featured/?shrimp,skewers',
    title: 'Zesty Shrimp Skewers',
  },
  {
    image: 'https://source.unsplash.com/featured/?lemon,tart',
    title: 'Lemon Tartlets',
  },
  {
    image: 'https://source.unsplash.com/featured/?pasta,vegetables',
    title: 'Pasta Primavera',
  },
];

function RecipeCard({ title, image }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="max-w-xs w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <img className="object-cover w-full h-48" src={image} alt={title} />
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
        <h1 className="text-lg font-bold text-white">{title}</h1>
        <button
          onClick={() => setLiked(!liked)}
          className={`transition-colors duration-300 focus:outline-none ${
            liked ? 'text-red-500' : 'text-white hover:text-red-500'
          }`}
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
                     4.5 2.09C13.09 3.81 14.76 3 16.5 3 
                     19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                     6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function RecipeCards() {
  const [recipes] = useState(initialRecipes);

  const rows = [];
  for (let i = 0; i < recipes.length; i += 2) {
    const row = recipes.slice(i, i + 2);
    rows.push(row);
  }

  return (
    <div className="bg-gray-100 p-6 space-y-6">
      {rows.map((row, index) => (
        <div
          key={index}
          className={`flex ${
            row.length === 1 ? 'justify-center' : 'justify-center'
          } flex-wrap gap-6`}
        >
          {row.map((recipe, idx) => (
            <RecipeCard key={`${index}-${idx}`} {...recipe} />
          ))}
        </div>
      ))}
    </div>
  );
}
