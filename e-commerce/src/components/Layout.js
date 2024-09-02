import React, { Children } from "react";
import { Link, Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbarr from "./Navbarr";

const Layout = () => {
  return (
    <>
      <Navbarr />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
