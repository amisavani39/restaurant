import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaShoppingCart, FaSearch, FaTimes, FaBars } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <header className="header_section">
      <div className="container">
        <nav className="navbar">
          <Link className="navbar-brand" to="/">
            <span>Feane</span>
          </Link>

          <div className="nav_container">
            <ul className="nav_links">
              <li className={location.pathname === "/" ? "active" : ""}>
                <Link to="/">Home</Link>
              </li>
              <li className={location.pathname === "/menu" ? "active" : ""}>
                <Link to="/menu">Menu</Link>
              </li>
              <li className={location.pathname === "/about" ? "active" : ""}>
                <Link to="/about">About</Link>
              </li>
              <li className={location.pathname === "/book" ? "active" : ""}>
                <Link to="/book">Book Table</Link>
              </li>
            </ul>

            <div className="user_option">
              <button onClick={toggleSidebar} className="user_link">
                <FaUser />
              </button>
              <Link to="/cart">
                <FaShoppingCart />
              </Link>
              <button className="search_btn">
                <FaSearch />
              </button>
              <Link to="/menu" className="order_online">Order Online</Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Side Slider for Login/Register */}
      <div className={`user_sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar_header">
          <h3>{user ? `Hi, ${user.name}` : "Welcome"}</h3>
          <button onClick={toggleSidebar} className="close_btn">
            <FaTimes />
          </button>
        </div>
        <div className="sidebar_content">
          {user ? (
            <>
              <Link to="/profile" onClick={toggleSidebar}>My Profile</Link>
              <Link to="/orders" onClick={toggleSidebar}>My Orders</Link>
              <button onClick={() => { logout(); toggleSidebar(); }} className="logout_btn">Logout</button>
            </>
          ) : (
            <>
              <p>Sign in to manage your orders and profile.</p>
              <Link to="/login" className="sidebar_link primary" onClick={toggleSidebar}>Login</Link>
              <Link to="/register" className="sidebar_link secondary" onClick={toggleSidebar}>Register</Link>
            </>
          )}
        </div>
      </div>
      {isSidebarOpen && <div className="sidebar_overlay" onClick={toggleSidebar}></div>}
    </header>
  );
};

export default Navbar;
