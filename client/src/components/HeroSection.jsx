import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const HeroSection = () => {
  return (
    <section className="hero_area">
      {/* Background Image */}
      <div className="bg-box">
        <img src="/image/hero-bg.jpg" alt="bg" />
      </div>

      <Navbar />

      {/* Hero Content */}
      <section className="slider_section">
        <div className="container">
          <div className="row">
            {/* Left Text */}
            <div className="detail-box">
              <h1>Fast Food Restaurant</h1>
              <p>
                Doloremque, itaque aperiam facilis rerum, commodi, temporibus
                sapiente ad mollitia laborum quam quisquam esse error unde.
              </p>
              <div className="btn-box">
                <Link to="/book" className="btn1">Book Table</Link>
                <Link to="/menu" className="btn2">Order Now</Link>
              </div>

              {/* Slider Dots */}
              <div className="slider_indicators">
                <div className="dot active-dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default HeroSection;
