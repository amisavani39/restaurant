import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders/user/${user._id}`);
      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user orders:", err);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="mb-4">My Orders</h2>
        {orders.length === 0 ? (
          <p className="text-center py-5">You haven't placed any orders yet.</p>
        ) : (
          <div className="row">
            {orders.map((order) => (
              <div key={order._id} className="col-md-12 mb-4">
                <div className="card shadow-sm">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <span>Order ID: #{order._id.substring(0, 8)}</span>
                    <span className={`badge ${
                      order.status === 'delivered' ? 'bg-success' : 
                      order.status === 'cancelled' ? 'bg-danger' : 
                      order.status === 'shipped' ? 'bg-info' : 'bg-warning'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        <h6>Items:</h6>
                        <ul className="list-unstyled">
                          {order.items.map((item, idx) => (
                            <li key={idx}>
                              {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-md-4 text-end">
                        <p className="mb-1"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                        <p className="mb-1"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="small text-muted">{order.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
