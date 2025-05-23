import React from "react";
import { Outlet } from "react-router-dom"; // Placeholder for nested routes
import Navbar from "../components/topnavbar"; // Top navigation bar
import Footbar from "../components/footbar"; // Bottom fixed/mobile nav bar
import InfoFooter from "../components/infoFooter"; // Site-wide footer

/**
 * Layout component that wraps every page with common UI elements:
 * - Top navbar
 * - Dynamic page content (via <Outlet />)
 * - Bottom nav and footer
 * code was done from personal experience
 * 
 * @author Leslie Zhang
 */
const Layout = () => {
  return (
    <>
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Dynamic content based on the current route */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Bottom Navigation Bar */}
      <Footbar />

      {/* Static footer with site information */}
      <InfoFooter />
    </>
  );
};

export default Layout;
