import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBox, FaCalendarCheck, FaTachometerAlt, FaTimes, FaUtensils, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  if (!isOpen) return null;

  const links = [
    { path: "/", icon: <FaTachometerAlt />, label: "Dashboard" },
    { path: "/orders", icon: <FaBox />, label: "Orders" },
    { path: "/bookings", icon: <FaCalendarCheck />, label: "Bookings" },
    { path: "/menu", icon: <FaUtensils />, label: "Menu Management" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Feane Admin</h2>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      
      <ul className="sidebar-links">
        {links.map((link) => (
          <li key={link.path} className={location.pathname === link.path ? "active" : ""}>
            <Link to={link.path} onClick={() => window.innerWidth < 768 && onClose()}>
              {link.icon} <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <div className="admin-profile">
          <div className="avatar">AD</div>
          <div className="admin-info">
            <span className="admin-name">Administrator</span>
            <span className="admin-role">Super Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
