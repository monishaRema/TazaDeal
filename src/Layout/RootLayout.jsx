import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Header/Navbar";
import Footer from "../Components/Footer/Footer";
const Root = () => {
  return (
    <>

      <Navbar></Navbar>
      <main className="main">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
     
    </>
  );
};

export default Root;
