import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000";

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_URL}/${imagePath}`;
  };

  useEffect(() => {
    if (user) {
      fetch(`${API_URL}/api/cart/${user._id}`)
        .then((res) => res.json())
        .then((data) => setCart(data?.items || []))
        .catch((err) => console.error("Error fetching cart:", err));
    }
  }, [user]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place an order.");
      return;
    }

    if (!address.trim()) {
      alert("Please provide a delivery address.");
      return;
    }

    const orderData = {
      userId: user._id,
      items: cart.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      totalAmount: calculateTotal(),
      address: address,
    };

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        navigate("/order-success");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-page container py-5">
        <h2 className="mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-center py-5">
            <p>Your cart is empty.</p>
            <button className="btn btn-warning" onClick={() => navigate("/menu")}>
              Go to Menu
            </button>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-8">
              <ul className="list-group mb-4">
                {cart.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img src={getImageUrl(item.image)} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "15px" }} />
                      <div>
                        <h5 className="mb-0">{item.name}</h5>
                        <small>Quantity: {item.quantity}</small>
                      </div>
                    </div>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>

              <div className="card p-3 shadow-sm mb-4">
                <h4>Delivery Address</h4>
                <div className="form-group mt-2">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter your full address (Street, City, Pin Code)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 shadow-sm">
                <h4>Summary</h4>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Items:</span>
                  <span>{cart.length}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Total Amount:</span>
                  <strong>₹{calculateTotal()}</strong>
                </div>
                <button className="btn btn-warning btn-block mt-4" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
