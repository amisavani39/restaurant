import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AboutSection from "./AboutSection";

const About = () => {
  return (
    <div className="sub_page">
        <div className="hero_area" style={{ minHeight: "450px" }}>
          <div className="bg-box">
            <img src="/image/hero-bg.jpg" alt="bg" />
          </div>
          <Navbar />
        </div>
      <AboutSection />
      <Footer />
    </div>
  );
};

export default About;
