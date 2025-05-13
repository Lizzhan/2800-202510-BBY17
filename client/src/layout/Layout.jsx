import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/topnavbar";
import Footbar from "../components/footbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footbar />
    </>
  );
};

export default Layout;