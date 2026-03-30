import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer_section">
      <div className="container">
        <div className="footer_grid">
          <div className="footer_col" data-aos="fade-up" data-aos-delay="100">
            <h4>Contact Us</h4>
            <div className="contact_link_box">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-map-marker"></i>
                <span>123 Street, New York, USA</span>
              </a>
              <a href="tel:+011234567890">
                <i className="fa fa-phone"></i>
                <span>+01 1234567890</span>
              </a>
              <a href="mailto:info@feane.com">
                <i className="fa fa-envelope"></i>
                <span>info@feane.com</span>
              </a>
            </div>
          </div>

          <div className="footer_col" data-aos="fade-up" data-aos-delay="200">
            <Link to="/" className="footer_logo">
              Feane
            </Link>
            <p>
              Delivering happiness to your doorstep. We use only the freshest 
              ingredients to create the most delicious meals for you and your family.
            </p>
            <div className="footer_social">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="Pinterest"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>

          <div className="footer_col" data-aos="fade-up" data-aos-delay="300">
            <h4>Quick Links</h4>
            <ul className="footer_links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Our Menu</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/book">Book A Table</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>

          <div className="footer_col" data-aos="fade-up" data-aos-delay="400">
            <h4>Opening Hours</h4>
            <div className="opening_hours">
              <p><span>Monday - Friday:</span> 10.00 AM - 10.00 PM</p>
              <p><span>Saturday - Sunday:</span> 11.00 AM - 11.00 PM</p>
              <div className="newsletter_box">
                <h5>Newsletter</h5>
                <form action="">
                  <input type="email" placeholder="Your Email" required />
                  <button type="submit"><i className="fa fa-paper-plane"></i></button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-info">
          <div className="footer-bottom-grid">
            <div className="copyright">
              <p>&copy; {currentYear} <span>Feane</span>. All Rights Reserved.</p>
            </div>
            <div className="payment_methods">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-paypal"></i>
              <i className="fab fa-cc-apple-pay"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        className={`scroll-to-top ${showScroll ? 'show' : ''}`} 
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <i className="fa fa-arrow-up"></i>
      </button>
    </footer>
  );
};

export default Footer;
