import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBox, FaCalendarCheck, FaUtensils, FaClock, FaChevronRight, FaUser, FaPhone } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    orders: 0,
    bookings: 0,
    foods: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        const [ordersRes, bookingsRes, foodsRes] = await Promise.all([
          axios.get(`${API_URL}/api/orders`, config),
          axios.get(`${API_URL}/api/bookings`, config),
          axios.get(`${API_URL}/api/food`, config)
        ]);

        setStats({
          orders: ordersRes.data.length,
          bookings: bookingsRes.data.length,
          foods: foodsRes.data.length
        });

        // Get 5 most recent items
        setRecentOrders(ordersRes.data.reverse().slice(0, 5));
        setRecentBookings(bookingsRes.data.reverse().slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [API_URL]);

  const statCards = [
    { label: "Total Orders", value: stats.orders, icon: <FaBox />, color: "#3b82f6", bg: "#eff6ff" },
    { label: "Total Bookings", value: stats.bookings, icon: <FaCalendarCheck />, color: "#10b981", bg: "#ecfdf5" },
    { label: "Food Items", value: stats.foods, icon: <FaUtensils />, color: "#f39c12", bg: "#fff8eb" },
  ];

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <div className="loading">Loading Dashboard...</div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "4px" }}>
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="date-display" style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", padding: "8px 16px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", fontSize: "0.875rem", fontWeight: "500" }}>
          <FaClock style={{ color: "var(--primary-color)" }} />
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "32px" }}>
        {statCards.map((stat, index) => (
          <div key={index} className="card stat-card" style={{ display: "flex", alignItems: "center", gap: "20px", padding: "24px", marginBottom: 0 }}>
            <div className="stat-icon" style={{ backgroundColor: stat.bg, color: stat.color, width: "56px", height: "56px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", fontWeight: "500", marginBottom: "4px" }}>{stat.label}</p>
              <h3 style={{ fontSize: "1.75rem", margin: 0, fontWeight: "700", color: "#111827" }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="content-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "24px" }}>
        {/* Recent Orders Section */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="recent-orders-header">
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700" }}>Recent Orders</h3>
            <Link to="/orders" className="view-all-link">
              View All <FaChevronRight size={10} />
            </Link>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <span className="order-id">#{order._id.slice(-6).toUpperCase()}</span>
                      </td>
                      <td>
                        <span className={`status-badge status-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ fontWeight: "600" }}>₹{order.totalAmount.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>No recent orders</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Bookings Section */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="recent-bookings-header">
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700" }}>Recent Bookings</h3>
            <Link to="/bookings" className="view-all-link">
              View All <FaChevronRight size={10} />
            </Link>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>
                        <div className="customer-info">
                          <span className="customer-name">{booking.name}</span>
                          <span className="customer-email" style={{ fontSize: "0.7rem" }}><FaPhone size={8} /> {booking.phone}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: "0.8rem", fontWeight: "500" }}>
                          {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                          {booking.time}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>No recent bookings</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card quick-actions" style={{ marginTop: "24px" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "20px" }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Link to="/menu" className="btn btn-primary" style={{ padding: "12px 24px" }}>
            <FaUtensils /> Manage Menu
          </Link>
          <Link to="/orders" className="btn" style={{ padding: "12px 24px", border: "1px solid #e5e7eb", background: "white" }}>
            <FaBox /> Manage Orders
          </Link>
          <Link to="/bookings" className="btn" style={{ padding: "12px 24px", border: "1px solid #e5e7eb", background: "white" }}>
            <FaCalendarCheck /> Manage Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
