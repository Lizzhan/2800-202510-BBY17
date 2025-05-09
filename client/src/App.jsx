import React, { useState } from "react";
<<<<<<< HEAD
import Navbar from "./components/topnavbar";
import SearchBarWithDropdown from "./components/search_bar_w_dropdown";
import SearchList from "./components/ScrollablePantry";
import IngredientModal from "./components/IngredientModal";
import PrimaryButton from "./components/button";
import FilterTagSection from "./components/FilterTagSection";


const allItems = [
  "Apple", "Banana", "Cherry", "Date", "Elderberry",
  "Fig", "Grape", "Honeydew", "Kiwi", "Lemon"
];
<<<<<<< HEAD
import Footbar from "./components/footbar";
=======
import GalleryContainer from "./components/GalleryContainer";

>>>>>>> lucas_liu_scrollable_gallery
=======
import { useState } from 'react';
import TopNavbar from './components/TopNavbar';
import Cookbook from './pages/cookbook';
import Footbar from './components/Footbar';
import Home from './pages/home';
>>>>>>> lucas_liu_routing_page

export default function App() {
  const [selectedPantryItems, setSelectedPantryItems] = useState([]);
  const [selectedFridgeItems, setSelectedFridgeItems] = useState([]);
  const [modalIngredient, setModalIngredient] = useState(null);

  const openModalForItem = (item) => {
    setModalIngredient(item);
  };

  const closeModal = () => {
    setModalIngredient(null);
  };

  const handleAddToPantry = (item) => {
    if (!selectedPantryItems.includes(item)) {
      setSelectedPantryItems([...selectedPantryItems, item]);
    }
    closeModal();
  };

  const handleAddToFridge = (item) => {
    if (!selectedFridgeItems.includes(item)) {
      setSelectedFridgeItems([...selectedFridgeItems, item]);
    }
    closeModal();
  };

  const handleRemovePantryItem = (index) => {
    const newItems = [...selectedPantryItems];
    newItems.splice(index, 1);
    setSelectedPantryItems(newItems);
  };

  const handleRemoveFridgeItem = (index) => {
    const newItems = [...selectedFridgeItems];
    newItems.splice(index, 1);
    setSelectedFridgeItems(newItems);
  };

  const handleSuggestRecipe = () => {
    console.log("Pantry ingredients:", selectedPantryItems);
    console.log("Fridge ingredients:", selectedFridgeItems);
    alert("Suggesting a recipe based on your ingredients...");
  };

  const [pageStack, setPageStack] = useState(['home']);
  const currentPage = pageStack[pageStack.length - 1];

  const navigateTo = (page) => {
    setPageStack((prev) => [...prev, page]);
  };

  const goBack = () => {
    if (pageStack.length > 1) {
      setPageStack((prev) => prev.slice(0, -1));
    }
  };

  return (
<<<<<<< HEAD
    <>
    <div className="min-h-screen bg-[#FDF6EC]">
      <Navbar />
      <main className="p-4 space-y-8 max-w-2xl mx-auto">
        <SearchBarWithDropdown onSearch={openModalForItem} />

        <h2 className="text-xl font-semibold">Pantry</h2>
        <SearchList items={selectedPantryItems} onRemove={handleRemovePantryItem} />

        <h2 className="text-xl font-semibold">Fridge</h2>
        <SearchList items={selectedFridgeItems} onRemove={handleRemoveFridgeItem} />

        <FilterTagSection onFilterChange={(tags) => console.log("Selected filters:", tags)} />


        <div className="flex justify-center pt-4">
          <PrimaryButton onClick={handleSuggestRecipe}>
            Suggest Recipe
          </PrimaryButton>
        </div>
      </main>
    </div>

      <IngredientModal
        ingredient={modalIngredient}
        onClose={closeModal}
        onAddToPantry={handleAddToPantry}
        onAddToFridge={handleAddToFridge}
      />
    </>
=======

      <Footbar onNavigate={navigateTo} />
    </div>
>>>>>>> lucas_liu_routing_page
  );
}
