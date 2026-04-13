import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaSync, FaSearch, FaFilter, FaUser, FaMapMarkerAlt, FaShoppingBag } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await axios.get(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data.reverse()); // Show newest first
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders", error);
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      const token = localStorage.getItem("adminToken");
      try {
        await axios.delete(`${API_URL}/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(orders.filter(o => o._id !== id));
      } catch (error) {
        console.error("Error deleting order", error);
      }
    }
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.put(`${API_URL}/api/orders/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "All" || order.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="orders-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Order Management</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Review and manage customer food orders.
          </p>
        </div>
        <button className="btn btn-primary" onClick={fetchOrders}>
          <FaSync /> Refresh Data
        </button>
      </div>

      <div className="card" style={{ marginBottom: "24px", padding: "16px" }}>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "250px" }}>
            <FaSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input 
              type="text" 
              placeholder="Search by Order ID or address..." 
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%", padding: "10px 10px 10px 36px", borderRadius: "8px", border: "1px solid #e5e7eb", outline: "none" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaFilter style={{ color: "#6b7280" }} />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ padding: "10px", borderRadius: "8px", border: "1px solid #e5e7eb", outline: "none", minWidth: "150px" }}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "60px", textAlign: "center" }}>
            <div className="loading">Loading orders...</div>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order Details</th>
                  <th>Customer Info</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <span className="order-id" style={{ width: "fit-content" }}>#{order._id.slice(-8).toUpperCase()}</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: "600" }}>
                            <FaUser size={12} style={{ color: "#9ca3af" }} /> 
                            Customer #{order.userId.slice(-6).toUpperCase()}
                          </div>
                          <div style={{ display: "flex", alignItems: "start", gap: "6px", fontSize: "0.75rem", color: "var(--text-muted)", maxWidth: "180px" }}>
                            <FaMapMarkerAlt size={12} style={{ marginTop: "2px", flexShrink: 0 }} /> 
                            {order.address}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          {order.items.map((item, idx) => (
                            <div key={idx} style={{ fontSize: "0.8rem", display: "flex", justifyContent: "space-between", gap: "10px" }}>
                              <span>{item.name}</span>
                              <span style={{ fontWeight: "600", color: "var(--text-muted)" }}>x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: "700", fontSize: "1rem", color: "#111827" }}>
                          ₹{order.totalAmount.toFixed(2)}
                        </div>
                      </td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className={`status-badge status-${order.status.toLowerCase()}`}
                          style={{ border: "1px solid", padding: "6px 12px" }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button 
                          className="btn btn-danger" 
                          onClick={() => deleteOrder(order._id)}
                          style={{ padding: "8px", borderRadius: "8px" }}
                          title="Delete Order"
                        >
                          <FaTrash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                      <FaShoppingBag size={40} style={{ display: "block", margin: "0 auto 10px", opacity: 0.2 }} />
                      No orders found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
