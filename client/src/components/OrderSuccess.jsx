import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="container py-5 text-center my-5">
        <div className="py-5 shadow-sm border rounded">
          <i className="fa fa-check-circle text-success" style={{ fontSize: "60px" }}></i>
          <h2 className="mt-3">Order Placed Successfully!</h2>
          <p className="text-muted">Thank you for your order. We are preparing your food.</p>
          <button className="btn btn-warning mt-4 px-4" onClick={() => navigate("/menu")}>
            Back to Menu
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;
