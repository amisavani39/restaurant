import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaPlus, FaMinus, FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import "./CartPage.css";
import AOS from "aos";
import "aos/dist/aos.css";

const CartPage = () => {
  const { cartItems, clearCart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    if (imagePath.startsWith("http") || imagePath.startsWith("/")) return imagePath;
    if (imagePath.startsWith("image/")) return `/${imagePath}`;
    return `${API_URL}/${imagePath}`;
  };

  const [updatingId, setUpdatingId] = useState(null);

  const handleUpdateQuantity = async (item, change) => {
    // Get a reliable ID from the item
    const productId = item.productId?._id || item.productId || item._id;
    if (!productId) return;

    const currentQty = Number(item.quantity || 0);
    const newQuantity = currentQty + change;
    if (newQuantity < 1) return;
    
    setUpdatingId(productId);
    try {
      await updateQuantity(productId, newQuantity);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemoveFromCart = async (item) => {
    // Determine the most reliable ID for this item
    // Prefer product ID as the backend usually identifies items by product in a user's cart
    const targetId = item.productId?._id || item.productId || item._id;
    
    if (!targetId) return;

    if (window.confirm("Remove this item from cart?")) {
      setUpdatingId(targetId);
      try {
        await removeFromCart(targetId);
      } catch (err) {
        console.error("Remove from cart failed:", err);
      } finally {
        setUpdatingId(null);
      }
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (Number(item.price || 0) * Number(item.quantity || 0)), 0);
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
      items: cartItems.map(item => ({
        productId: item.productId?._id || item.productId || item._id,
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
        clearCart();
        navigate("/order-success");
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="sub_page">
      <div className="hero_area" style={{ minHeight: "450px" }}>
        <div className="bg-box">
          <img src="/image/hero-bg.jpg" alt="bg" />
        </div>
        <Navbar />
      </div>
      
      <section className="cart-page-section py-5">
        <div className="container">
          <h2 className="cart-title text-center mb-5" data-aos="fade-down" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "3.5rem" }}>
            Shopping Cart
          </h2>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart-container" data-aos="fade-up">
              <div className="empty-cart-icon">
                <FaShoppingCart />
              </div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <Link to="/menu" className="go-menu-btn">
                Browse Our Menu
              </Link>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-8" data-aos="fade-right">
                <div className="cart-card">
                  {cartItems.map((item, index) => {
                    const itemProdId = item.productId?._id || item.productId || item._id;
                    return (
                      <div key={itemProdId || index} className="cart-item" style={{ animationDelay: `${index * 0.1}s` }}>
                        <img 
                          src={getImageUrl(item.image)} 
                          alt={item.name} 
                          className="cart-item-img" 
                        />
                        <div className="cart-item-details">
                          <h5 className="cart-item-name">{item.name}</h5>
                          <p className="cart-item-price">₹{item.price}</p>
                        </div>
                        
                        <div className="cart-quantity-controls" style={{ opacity: updatingId === itemProdId ? 0.5 : 1 }}>
                          <button 
                            className="qty-btn" 
                            onClick={() => handleUpdateQuantity(item, -1)}
                            disabled={Number(item.quantity) <= 1 || updatingId === itemProdId}
                          >
                            <FaMinus />
                          </button>
                          <span className="qty-number">{item.quantity}</span>
                          <button 
                            className="qty-btn" 
                            onClick={() => handleUpdateQuantity(item, 1)}
                            disabled={updatingId === itemProdId}
                          >
                            <FaPlus />
                          </button>
                        </div>
                        
                        <div className="cart-item-subtotal">
                          <strong>₹{item.price * item.quantity}</strong>
                        </div>
                        
                        <button 
                          className="remove-item-btn ms-4" 
                          onClick={() => handleRemoveFromCart(item)}
                          disabled={updatingId === itemProdId}
                          title="Remove Item"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="cart-card address-section" data-aos="fade-up" data-aos-delay="200">
                  <h4>Delivery Address</h4>
                  <textarea
                    className="address-textarea"
                    rows="3"
                    placeholder="Enter your full address (Street, City, Pin Code)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="col-lg-4" data-aos="fade-left">
                <div className="cart-card cart-summary-card">
                  <h3 className="summary-title">Order Summary</h3>
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery Fee</span>
                    <span>₹0</span>
                  </div>
                  <div className="summary-row summary-total">
                    <span>Total</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                  
                  <button 
                    className="checkout-btn" 
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                  
                  <div className="mt-3 text-center">
                    <Link to="/menu" style={{ color: "var(--secondary-color)", fontWeight: "600" }}>
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CartPage;
