import { useState, useEffect } from 'react';
import RecipeCard from './recipecard';
import axios from 'axios';

// Hardcoded recipes list with IDs
const initialRecipes = [
  { id: 1, title: "Crispy Basil Chicken", image: "https://source.unsplash.com/featured/?basil,chicken" },
  { id: 2, title: "Sweet Potato Stew", image: "https://source.unsplash.com/featured/?sweet-potato,stew" },
  { id: 3, title: "Zesty Shrimp Skewers", image: "https://source.unsplash.com/featured/?shrimp,skewers" },
  { id: 4, title: "Lemon Tartlets", image: "https://source.unsplash.com/featured/?lemon,dessert" },
  { id: 5, title: "Pasta Primavera", image: "https://source.unsplash.com/featured/?pasta,vegetables" },
  { id: 6, title: "Avocado Toast", image: "https://source.unsplash.com/featured/?avocado,toast" },
  { id: 7, title: "Grilled Salmon", image: "https://source.unsplash.com/featured/?grilled,salmon" },
  { id: 8, title: "Stuffed Bell Peppers", image: "https://source.unsplash.com/featured/?stuffed,peppers" },
  { id: 9, title: "Mango Smoothie Bowl", image: "https://source.unsplash.com/featured/?mango,smoothie" },
  { id: 10, title: "Spinach Ricotta Ravioli", image: "https://source.unsplash.com/featured/?ravioli,spinach" },
  { id: 11, title: "Beef Bulgogi", image: "https://source.unsplash.com/featured/?beef,korean" },
  { id: 12, title: "Spicy Tofu Stir-Fry", image: "https://source.unsplash.com/featured/?tofu,stir-fry" },
  { id: 13, title: "Chicken Caesar Salad", image: "https://source.unsplash.com/featured/?caesar,salad" },
  { id: 14, title: "Miso Ramen", image: "https://source.unsplash.com/featured/?ramen,miso" },
  { id: 15, title: "Blueberry Pancakes", image: "https://source.unsplash.com/featured/?blueberry,pancakes" },
  { id: 16, title: "BBQ Pulled Pork", image: "https://source.unsplash.com/featured/?bbq,pork" },
  { id: 17, title: "Butternut Squash Soup", image: "https://source.unsplash.com/featured/?butternut,soup" },
  { id: 18, title: "Falafel Wrap", image: "https://source.unsplash.com/featured/?falafel,wrap" },
  { id: 19, title: "Sushi Rolls", image: "https://source.unsplash.com/featured/?sushi" },
  { id: 20, title: "Chocolate Lava Cake", image: "https://source.unsplash.com/featured/?chocolate,dessert" },
];

export default function RecipeCardGallery() {
  const [recipes] = useState(initialRecipes);
  const [savedRecipes, setSavedRecipes] = useState([]); // ✅ always starts as empty array

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get('/api/saved-recipes', { withCredentials: true });
        setSavedRecipes(response.data || []); // ✅ fallback to empty array if backend sends nothing
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
        setSavedRecipes([]); // ✅ fallback on error too
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="min-w-[16rem]">
          <RecipeCard 
            title={recipe.title}
            image={recipe.image}
            recipeId={recipe.id}
            initiallyLiked={Array.isArray(savedRecipes) && savedRecipes.includes(recipe.id)} // ✅ extra safety
          />
        </div>
      ))}
    </div>
  );
}
