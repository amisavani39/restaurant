import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Bookings from "./pages/Bookings";
import Menu from "./pages/Menu";
import { FaBars } from "react-icons/fa";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className={`App ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        {!isSidebarOpen && (
          <button className="open-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
        )}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
