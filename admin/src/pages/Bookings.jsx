import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaSync, FaUserFriends, FaCalendarAlt } from "react-icons/fa";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings", error);
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${id}`);
        fetchBookings();
      } catch (error) {
        console.error("Error deleting booking", error);
      }
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}`, { status });
      fetchBookings();
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  return (
    <div className="bookings-page">
      <div className="page-header">
        <h1 className="page-title">Booking Management</h1>
        <button className="btn btn-primary" onClick={fetchBookings}>
          <FaSync /> Refresh
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center" }}>Loading bookings...</div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact Info</th>
                  <th>Reservation</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>
                      <div style={{ fontWeight: "600" }}>{booking.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{booking.email}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: "0.85rem" }}>{booking.phone}</div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", marginBottom: "4px" }}>
                        <FaCalendarAlt style={{ color: "var(--primary-color)" }} />
                        {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {booking.time}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        <FaUserFriends /> {booking.persons} {booking.persons > 1 ? "Persons" : "Person"}
                      </div>
                    </td>
                    <td>
                      <select
                        value={booking.status}
                        onChange={(e) => updateStatus(booking._id, e.target.value)}
                        className={`status-badge status-${booking.status.toLowerCase()}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => deleteBooking(booking._id)}
                        title="Delete Booking"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
