import React, { useState } from "react";
import Navbar from "./components/topnavbar";
import SearchBar from "./components/search_bar";
import SearchBarWithDropdown from "./components/search_bar_w_dropdown";

import SearchList from './components/scrollable_pantry';

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar />
      <main className="p-4 space-y-8">
        <div className="max-w-md mx-auto">
          <SearchBar onSearch={(val) => console.log("Searching for:", val)} />
        </div>
        <div className="max-w-md mx-auto">
          <SearchBarWithDropdown onSearch={(val) => console.log("Searching for:", val)} />
        </div>

        <h2 className="text-2xl">Scroll down to test the sticky navbar 👇</h2>

        <scrollable_pantry />

        {/* Dummy content */}
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i} className="text-gray-700">
            This is paragraph #{i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        ))}
      </main>
    </>
  );
}