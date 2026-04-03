import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaSync } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders", error);
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${id}`);
        fetchOrders();
      } catch (error) {
        console.error("Error deleting order", error);
      }
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1 className="page-title">Order Management</h1>
        <button className="btn btn-primary" onClick={fetchOrders}>
          <FaSync /> Refresh
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center" }}>Loading orders...</div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td style={{ fontWeight: "600" }}>#{order._id.substring(18)}</td>
                    <td>
                      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>ID: {order.userId.substring(0, 8)}...</div>
                    </td>
                    <td>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ fontSize: "0.85rem" }}>
                          {item.name} <span style={{ color: "var(--text-muted)" }}>x{item.quantity}</span>
                        </div>
                      ))}
                    </td>
                    <td style={{ fontWeight: "700" }}>${order.totalAmount}</td>
                    <td style={{ maxWidth: "200px", fontSize: "0.85rem" }}>{order.address}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className={`status-badge status-${order.status.toLowerCase()}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => deleteOrder(order._id)}
                        title="Delete Order"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
