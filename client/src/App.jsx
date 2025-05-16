import React from "react";
import Navbar from "./components/topnavbar";
import Cookbook from './pages/cookbook';
import Home from './pages/home';
import Fridge from './pages/fridge'
import Footbar from "./components/footbar";
import Profile from './pages/UserProfile';
import InfoFooter from "./components/infoFooter";
import Index from "./pages/Index";
import Layout from "./layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login'
import { useAuth } from "./context/AuthContext";
import Suggest from './pages/RecipeDetail';

//is user input escaped
export default function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // wait for session check to finish

  return (
    <div className="flex flex-col min-h-screen bg-kaidCream">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={isAuthenticated ? <Home /> : <Index />} />
            <Route path="/cookbook" element={<Cookbook />} />
            <Route path="/fridge" element={<Fridge />} />
            <Route path="/suggest" element={<Suggest />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/index" element={<Index />} />

          </Route>
        </Routes>
      </Router>


      <InfoFooter onNavigate={navigateTo} />
    </div>
  );
}
