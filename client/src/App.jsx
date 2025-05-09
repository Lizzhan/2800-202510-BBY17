import React, { useState } from "react";
import Navbar from "./components/topnavbar";
import Cookbook from './pages/cookbook';
import Home from './pages/home';
import Fridge from './pages/fridge'
import Footbar from "./components/footbar";
import Profile from './pages/UserProfile';



export default function App() {
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
    <div className="flex flex-col min-h-screen bg-[#FDF6EC]">
      <Navbar onNavigate={navigateTo} onBack={goBack} />

      <main className="flex-grow p-4 pb-24 max-w-3xl mx-auto">
        {currentPage === 'home' && <Home />}
        {currentPage === 'cookbook' && <Cookbook />}
        {currentPage === 'fridge' && <Fridge onNavigate={navigateTo} />}
        {currentPage === 'suggest' && <Suggest />}
        {currentPage === 'profile' && <Profile />}
      </main>

      <Footbar onNavigate={navigateTo} />
    </div>
  );
}
