<<<<<<< HEAD
import Navbar from "./components/topnavbar";
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
      <Navbar />
      <main className="p-4 pb-24">
        <h2 className="text-2xl">Scroll down to test the sticky navbar 👇</h2>
=======
    <div className="flex flex-col min-h-screen">
      <TopNavbar onNavigate={navigateTo} onBack={goBack} />
>>>>>>> lucas_liu_routing_page

      <main className="flex flex-col gap-6 flex-grow p-4 pb-24">
        {currentPage === 'home' && <Home />}

        {currentPage === 'cookbook' && (
          <>
            <Cookbook />
          </>
        )}

        {currentPage === 'profile' && (
          <div className="text-center text-lg">This is the Profile Page</div>
        )}
      </main>
<<<<<<< HEAD
      <Footbar />
    </>
=======

      <Footbar onNavigate={navigateTo} />
    </div>
>>>>>>> lucas_liu_routing_page
  );
}
