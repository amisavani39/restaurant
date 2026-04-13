import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Bookings from "./pages/Bookings";
import Menu from "./pages/Menu";
import { FaBars } from "react-icons/fa";
import "./App.css"; 

// Layout Component to handle Sidebar visibility
const Layout = ({ isSidebarOpen, toggleSidebar, onCloseSidebar }) => {
  return (
    <div className={`App ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {!isSidebarOpen && (
        <button className="open-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={onCloseSidebar} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Layout 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onCloseSidebar={() => setIsSidebarOpen(false)} 
      />
    </Router>
  );
}

export default App;
