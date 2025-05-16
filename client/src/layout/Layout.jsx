import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/topnavbar";
import Footbar from "../components/footbar";
import InfoFooter from "../components/infoFooter";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footbar />
      <InfoFooter />
    </>
  );
};

export default Layout;