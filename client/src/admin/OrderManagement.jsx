import React, { useEffect, useState } from "react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`);
      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchOrders(); // Refresh orders
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="order-management">
      <h2 className="mb-4">Order Management</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.substring(0, 8)}...</td>
                <td>{order.userId}</td>
                <td>
                  <ul className="list-unstyled mb-0">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>₹{order.totalAmount}</td>
                <td>{order.address}</td>
                <td>
                  <span className={`badge ${
                    order.status === 'delivered' ? 'bg-success' : 
                    order.status === 'cancelled' ? 'bg-danger' : 
                    order.status === 'shipped' ? 'bg-info' : 'bg-warning'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="text-center">No orders found.</p>}
      </div>
    </div>
  );
};

export default OrderManagement;
