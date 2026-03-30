import React from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";
import Footer from "./Footer";

const MenuPage = () => {
  return (
    <div className="sub_page">
      <div className="hero_area" style={{ minHeight: "450px" }}>
        <div className="bg-box">
          <img src="/image/hero-bg.jpg" alt="bg" />
        </div>
        <Navbar />
      </div>
      <Menu />
      <Footer />
    </div>
  );
};

export default MenuPage;
