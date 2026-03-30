import React from "react";

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-container">
          {/* Left Side: Image */}
          <div className="about-image">
            <img
              src="/image/about-img.png"
              alt="Exploded burger illustration"
            />
          </div>

          {/* Right Side: Content */}
          <div className="about-content">
            <h2 className="about-title">We Are Feane</h2>
            <p className="about-text">
              There are many variations of passages of Lorem Ipsum available, but the
              majority have suffered alteration in some form, by injected humour, or
              randomised words which don't look even slightly believable. If you are
              going to use a passage of Lorem Ipsum, you need to be sure there isn't
              anything embarrassing hidden in the middle of text.
            </p>
            <button className="read-more-btn">Read More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
