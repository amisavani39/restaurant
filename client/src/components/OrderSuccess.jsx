import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaCheckCircle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="sub_page">
      <div className="hero_area" style={{ minHeight: "350px", display: "flex", alignItems: "center" }}>
        <div className="bg-box">
          <img src="/image/hero-bg.jpg" alt="bg" />
        </div>
        <Navbar />
        <div className="container text-center text-white mt-5" data-aos="fade-down">
          <h1 className="display-4 font-weight-bold" style={{ fontFamily: "'Dancing Script', cursive", marginTop: "100px" }}>
            Order Confirmed!
          </h1>
        </div>
      </div>

      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center" data-aos="zoom-in" data-aos-delay="200">
              <div className="card border-0 shadow-lg p-5 rounded-lg" style={{ borderRadius: "20px" }}>
                <div className="mb-4">
                  <FaCheckCircle className="text-success" style={{ fontSize: "100px" }} />
                </div>
                <h2 className="mb-3 font-weight-bold" style={{ color: "var(--secondary-color)" }}>
                  Thank You for Your Order!
                </h2>
                <p className="lead text-muted mb-4">
                  Your order has been placed successfully and is being prepared with care. 
                  You will receive an update once it's out for delivery.
                </p>
                <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                  <button 
                    className="view-more border-0" 
                    onClick={() => navigate("/menu")}
                    style={{ minWidth: "200px" }}
                  >
                    Back to Menu
                  </button>
                  <button 
                    className="btn2 border-0" 
                    style={{ cursor: "pointer", minWidth: "200px" }}
                    onClick={() => navigate("/orders")}
                  >
                    View My Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
