import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaSync, FaUserFriends, FaCalendarAlt, FaSearch, FaFilter, FaEnvelope, FaPhone, FaHistory } from "react-icons/fa";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await axios.get(`${API_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data.reverse()); // Show newest first
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings", error);
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      const token = localStorage.getItem("adminToken");
      try {
        await axios.delete(`${API_URL}/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(bookings.filter(b => b._id !== id));
      } catch (error) {
        console.error("Error deleting booking", error);
      }
    }
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.put(`${API_URL}/api/bookings/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm);
    
    const matchesFilter = filterStatus === "All" || booking.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bookings-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Booking Management</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Manage table reservations and customer bookings.
          </p>
        </div>
        <button className="btn btn-primary" onClick={fetchBookings}>
          <FaSync /> Refresh Data
        </button>
      </div>

      <div className="card" style={{ marginBottom: "24px", padding: "16px" }}>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "250px" }}>
            <FaSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input 
              type="text" 
              placeholder="Search by name, email or phone..." 
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%", padding: "10px 10px 10px 36px", borderRadius: "8px", border: "1px solid #e5e7eb", outline: "none" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaFilter style={{ color: "#6b7280" }} />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ padding: "10px", borderRadius: "8px", border: "1px solid #e5e7eb", outline: "none", minWidth: "150px" }}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "60px", textAlign: "center" }}>
            <div className="loading">Loading bookings...</div>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Customer Details</th>
                  <th>Contact Info</th>
                  <th>Reservation Info</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <span className="customer-name" style={{ fontSize: "1rem" }}>{booking.name}</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ID: {booking._id.slice(-8).toUpperCase()}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}>
                            <FaEnvelope size={12} style={{ color: "var(--primary-color)" }} />
                            {booking.email}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}>
                            <FaPhone size={12} style={{ color: "var(--primary-color)" }} />
                            {booking.phone}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", fontWeight: "600" }}>
                            <FaCalendarAlt style={{ color: "var(--primary-color)" }} />
                            {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {booking.time}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                            <FaUserFriends /> {booking.persons} {booking.persons > 1 ? "Persons" : "Person"}
                          </div>
                        </div>
                      </td>
                      <td>
                        <select
                          value={booking.status}
                          onChange={(e) => updateStatus(booking._id, e.target.value)}
                          className={`status-badge status-${booking.status.toLowerCase()}`}
                          style={{ border: "1px solid", padding: "6px 12px" }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button 
                          className="btn btn-danger" 
                          onClick={() => deleteBooking(booking._id)}
                          style={{ padding: "8px", borderRadius: "8px" }}
                          title="Delete Booking"
                        >
                          <FaTrash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                      <FaHistory size={40} style={{ display: "block", margin: "0 auto 10px", opacity: 0.2 }} />
                      No bookings found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
