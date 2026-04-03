import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ food: 0, bookings: 0, orders: 0 });
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [foodRes, bookingsRes, ordersRes] = await Promise.all([
          fetch(`${API_URL}/api/food`),
          fetch(`${API_URL}/api/bookings`),
          fetch(`${API_URL}/api/orders`)
        ]);

        const [food, bookings, orders] = await Promise.all([
          foodRes.json(),
          bookingsRes.json(),
          ordersRes.json()
        ]);

        setStats({
          food: food.length || 0,
          bookings: bookings.length || 0,
          orders: orders.length || 0
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel. Here you can manage your restaurant's food items, orders, and bookings.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
        <div style={{ padding: '20px', background: '#e2f3f5', borderRadius: '8px' }}>
          <h3>Total Food Items</h3>
          <p style={{ fontSize: '2rem' }}>{stats.food}</p>
        </div>
        <div style={{ padding: '20px', background: '#e8f5e9', borderRadius: '8px' }}>
          <h3>Total Orders</h3>
          <p style={{ fontSize: '2rem' }}>{stats.orders}</p>
        </div>
        <div style={{ padding: '20px', background: '#fff4e3', borderRadius: '8px' }}>
          <h3>Total Bookings</h3>
          <p style={{ fontSize: '2rem' }}>{stats.bookings}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
