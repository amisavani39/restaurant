import React from "react";
import HeroSection from "./HeroSection";
import OffersSection from "./OffersSection";
import Menu from "./Menu";
import AboutSection from "./AboutSection";
import BookingSection from "./BookingSection";
import TestimonialSection from "./TestimonialSection";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="main-wrapper">
      <HeroSection />
      <OffersSection />
      <Menu />
      <AboutSection />
      <BookingSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Home;
