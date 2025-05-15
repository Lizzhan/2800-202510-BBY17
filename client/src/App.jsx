// import React, { useState } from "react";
import Navbar from "./components/topnavbar";
import Cookbook from './pages/cookbook';
import Home from './pages/home';
import Fridge from './pages/fridge'
import Footbar from "./components/footbar";
import Profile from './pages/UserProfile';
import Layout from "./layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login'
import RecipeDetail from './pages/RecipeDetail';

//is user input escaped
export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-kaidCream">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cookbook" element={<Cookbook />} />
            <Route path="/fridge" element={<Fridge />} />
            {/* <Route path="/suggest" element={<Suggest />} /> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Route>
        </Routes>
      </Router>


    </div>
  );
}
