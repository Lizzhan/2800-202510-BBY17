import React, { useState } from "react";
import Navbar from "./components/topnavbar";
import SearchBarSearchBarWithDropdown from "./components/search_bar_w_dropdown"; // your main search bar
import SearchList from "./components/ScrollablePantry"; // renamed for clarity
import SearchBarWithDropdown from "./components/search_bar_w_dropdown";

const allItems = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'];

export default function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddItem = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const filteredItems = allItems.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
    <main className="p-4 space-y-8 max-w-2xl mx-auto">
      <SearchBarWithDropdown onSearch={(value) => handleAddItem(value)} />

      <h2 className="text-xl font-semibold">Selected Ingredients:</h2>
      <SearchList items={selectedItems} />
    </main>

    </>
  );
}
