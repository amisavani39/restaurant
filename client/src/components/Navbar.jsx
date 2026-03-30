import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header_section">
      <div className="container">
        <div className="navbar">
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
              {user ? (
                <>
                  <span style={{ color: "white", marginRight: "10px" }}>Hi, {user.name}</span>
                  <Link to="/" onClick={logout} style={{ fontSize: "14px", color: "var(--primary-color)" }}>Logout</Link>
                </>
              ) : (
                <Link to="/login"><i className="fa fa-user"></i></Link>
              )}
              <a href="#"><i className="fa fa-shopping-cart"></i></a>
              <a href="#"><i className="fa fa-search"></i></a>
              <a href="#" className="order_online">Order Online</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
