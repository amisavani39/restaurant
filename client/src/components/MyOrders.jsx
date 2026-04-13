import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaClipboardList, FaClock } from "react-icons/fa";
import "./MyOrders.css";
import AOS from "aos";
import "aos/dist/aos.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    AOS.init({ duration: 1000 });
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/orders/user/${user._id}`);
      const data = await response.json();
      // Sort orders by date descending
      const sortedOrders = Array.isArray(data) 
        ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
        : [];
      setOrders(sortedOrders);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user orders:", err);
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
          method: "DELETE", // Or PATCH/PUT if you only update status
        });
        
        if (response.ok) {
          // Instead of deleting from state, maybe re-fetch or update status
          // In many systems, "cancel" just changes status to 'cancelled'
          // If the API actually deletes it, then remove from state
          // For now, let's re-fetch to get updated status/list
          fetchOrders();
          alert("Order cancelled successfully.");
        } else {
          const error = await response.json();
          alert(error.message || "Failed to cancel order.");
        }
      } catch (err) {
        console.error("Error cancelling order:", err);
        alert("Something went wrong.");
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    if (imagePath.startsWith("http") || imagePath.startsWith("/")) return imagePath;
    if (imagePath.startsWith("image/")) return `/${imagePath}`;
    return `${API_URL}/${imagePath}`;
  };

  return (
    <div className="sub_page">
      <div className="hero_area" style={{ minHeight: "350px" }}>
        <div className="bg-box">
          <img src="/image/hero-bg.jpg" alt="bg" />
        </div>
        <Navbar />
      </div>

      <section className="orders-page-section">
        <div className="container">
          <h2 className="orders-title" data-aos="fade-down">My Orders</h2>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Fetching your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="empty-orders" data-aos="fade-up">
              <div className="empty-orders-icon">
                <FaBoxOpen />
              </div>
              <h3>No orders found</h3>
              <p>You haven't placed any orders yet. Delicious food is just a few clicks away!</p>
              <Link to="/menu" className="browse-menu-btn">
                Browse Our Menu
              </Link>
            </div>
          ) : (
            <div className="row justify-content-center">
              <div className="col-lg-10">
                {orders.map((order, index) => (
                  <div 
                    key={order._id} 
                    className="order-card" 
                    data-aos="fade-up" 
                    data-aos-delay={index * 100}
                  >
                    <div className="order-header">
                      <div>
                        <span className="order-id">Order ID: #{order._id.substring(order._id.length - 8)}</span>
                        <div className="order-date">
                          <FaClock className="me-1" /> 
                          {new Date(order.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </div>
                      </div>
                      <span className={`status-badge ${getStatusClass(order.status)}`}>
                        {order.status || 'pending'}
                      </span>
                    </div>

                    <div className="order-body">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="order-item">
                          <img 
                            src={getImageUrl(item.image)} 
                            alt={item.name} 
                            className="order-item-img" 
                          />
                          <div className="order-item-info">
                            <h6 className="order-item-name">{item.name}</h6>
                            <span className="order-item-qty">Quantity: {item.quantity}</span>
                          </div>
                          <div className="order-item-price">
                            ₹{item.price * item.quantity}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <div className="order-total-box">
                        <span>Total Amount Paid</span>
                        <h5>₹{order.totalAmount}</h5>
                      </div>
                      
                      {order.status !== 'cancelled' && order.status !== 'delivered' && (
                        <button 
                          className="cancel-order-btn"
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MyOrders;
