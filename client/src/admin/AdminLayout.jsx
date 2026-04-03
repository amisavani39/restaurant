import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <nav className="admin-sidebar" style={{ width: '250px', float: 'left', background: '#f4f4f4', height: '100vh', padding: '20px' }}>
        <h2>Admin Panel</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/food">Food Management</Link></li>
          <li><Link to="/admin/orders">Order Management</Link></li>
          <li><Link to="/admin/bookings">Bookings</Link></li>
          <li><Link to="/">Back to Home</Link></li>
        </ul>
      </nav>
      <main className="admin-content" style={{ marginLeft: '270px', padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
