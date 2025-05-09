import { useState } from 'react';
import RecipeCard from './recipecard';

const initialRecipes = [
 { title: "Crispy Basil Chicken", image: "https://source.unsplash.com/featured/?basil,chicken" },
  { title: "Sweet Potato Stew", image: "https://source.unsplash.com/featured/?sweet-potato,stew" },
  { title: "Zesty Shrimp Skewers", image: "https://source.unsplash.com/featured/?shrimp,skewers" },
  { title: "Lemon Tartlets", image: "https://source.unsplash.com/featured/?lemon,dessert" },
  { title: "Pasta Primavera", image: "https://source.unsplash.com/featured/?pasta,vegetables" },
  { title: "Avocado Toast", image: "https://source.unsplash.com/featured/?avocado,toast" },
  { title: "Grilled Salmon", image: "https://source.unsplash.com/featured/?grilled,salmon" },
  { title: "Stuffed Bell Peppers", image: "https://source.unsplash.com/featured/?stuffed,peppers" },
  { title: "Mango Smoothie Bowl", image: "https://source.unsplash.com/featured/?mango,smoothie" },
  { title: "Spinach Ricotta Ravioli", image: "https://source.unsplash.com/featured/?ravioli,spinach" },
  { title: "Beef Bulgogi", image: "https://source.unsplash.com/featured/?beef,korean" },
  { title: "Spicy Tofu Stir-Fry", image: "https://source.unsplash.com/featured/?tofu,stir-fry" },
  { title: "Chicken Caesar Salad", image: "https://source.unsplash.com/featured/?caesar,salad" },
  { title: "Miso Ramen", image: "https://source.unsplash.com/featured/?ramen,miso" },
  { title: "Blueberry Pancakes", image: "https://source.unsplash.com/featured/?blueberry,pancakes" },
  { title: "BBQ Pulled Pork", image: "https://source.unsplash.com/featured/?bbq,pork" },
  { title: "Butternut Squash Soup", image: "https://source.unsplash.com/featured/?butternut,soup" },
  { title: "Falafel Wrap", image: "https://source.unsplash.com/featured/?falafel,wrap" },
  { title: "Sushi Rolls", image: "https://source.unsplash.com/featured/?sushi" },
  { title: "Chocolate Lava Cake", image: "https://source.unsplash.com/featured/?chocolate,dessert" },
];

export default function RecipeCardGallery() {
  const [recipes] = useState(initialRecipes);

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {recipes.map((recipe, idx) => (
        <div key={idx} className="min-w-[16rem]">
          <RecipeCard title={recipe.title} image={recipe.image} />
        </div>
      ))}
    </div>
  );
}