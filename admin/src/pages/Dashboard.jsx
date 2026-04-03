import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBox, FaCalendarCheck, FaUtensils, FaArrowUp, FaClock } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    orders: 0,
    bookings: 0,
    foods: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, bookingsRes, foodsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/orders"),
          axios.get("http://localhost:5000/api/bookings"),
          axios.get("http://localhost:5000/api/food")
        ]);
        
        setStats({
          orders: ordersRes.data.length,
          bookings: bookingsRes.data.length,
          foods: foodsRes.data.length
        });
        setRecentOrders(ordersRes.data.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const statCards = [
    { label: "Total Orders", value: stats.orders, icon: <FaBox />, color: "#3b82f6", bg: "#eff6ff" },
    { label: "Total Bookings", value: stats.bookings, icon: <FaCalendarCheck />, color: "#10b981", bg: "#ecfdf5" },
    { label: "Food Items", value: stats.foods, icon: <FaUtensils />, color: "#f39c12", bg: "#fff8eb" },
  ];

  if (loading) return <div className="loading">Loading Dashboard...</div>;

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <div className="date-display">
          <FaClock /> {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "32px" }}>
        {statCards.map((stat, index) => (
          <div key={index} className="card stat-card" style={{ display: "flex", alignItems: "center", gap: "20px", padding: "24px" }}>
            <div className="stat-icon" style={{ backgroundColor: stat.bg, color: stat.color, width: "60px", height: "60px", borderRadius: "14px", display: "flex", alignItems: "center", justifyCenter: "center", fontSize: "1.5rem", display: "flex", justifyContent: "center" }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", fontWeight: "500", marginBottom: "4px" }}>{stat.label}</p>
              <h3 style={{ fontSize: "1.75rem", margin: 0, fontWeight: "700" }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="content-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        <div className="card recent-orders">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ margin: 0 }}>Recent Orders</h3>
            <button className="btn" style={{ color: "var(--primary-color)", fontWeight: "600", padding: 0, background: "none" }}>View All</button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td style={{ fontWeight: "500" }}>#{order._id.substring(0, 6)}</td>
                    <td>{order.userId}</td>
                    <td>${order.totalAmount}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card quick-actions">
          <h3>Quick Actions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
            <button className="btn btn-primary" style={{ justifyContent: "center", padding: "12px" }}>Add New Food Item</button>
            <button className="btn" style={{ justifyContent: "center", padding: "12px", border: "1px solid #ddd" }}>Download Reports</button>
            <button className="btn" style={{ justifyContent: "center", padding: "12px", border: "1px solid #ddd" }}>System Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
