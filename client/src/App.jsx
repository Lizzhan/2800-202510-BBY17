// import React, { useState } from "react";
import Navbar from "./components/topnavbar";
import Cookbook from './pages/cookbook';
import Home from './pages/home';
import Fridge from './pages/fridge'
import Footbar from "./components/footbar";
import Profile from './pages/UserProfile';
import Layout from "./layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";


export default function App() {
  // const [pageStack, setPageStack] = useState(['home']);
  // // const currentPage = pageStack[pageStack.length - 1];

  // // const navigateTo = (page) => {
  // //   setPageStack((prev) => [...prev, page]);
  // // };

  // // const goBack = () => {
  // //   if (pageStack.length > 1) {
  // //     setPageStack((prev) => prev.slice(0, -1));
  // //   }
  // // };

  return (
    <div className="flex flex-col min-h-screen bg-kaidCream">

      {/* <Navbar onNavigate={navigateTo} onBack={goBack} />
      <main className="flex-grow p-4 pb-24 max-w-3xl mx-auto bg-kaidCream">
        {currentPage === 'home' && <Home />}
        {currentPage === 'cookbook' && <Cookbook />}
        {currentPage === 'fridge' && <Fridge onNavigate={navigateTo} />}
        {currentPage === 'suggest' && <Suggest />}
        {currentPage === 'profile' && <Profile />}
      </main>
      <Footbar onNavigate={navigateTo} /> */}

      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cookbook" element={<Cookbook />} />
            <Route path="/fridge" element={<Fridge />} />
            {/* <Route path="/suggest" element={<Suggest />} /> */}
            <Route path="/profile" element={<Profile />} />

            {/* <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} /> */}
          </Route>
        </Routes>
      </Router>


    </div>
  );
}
