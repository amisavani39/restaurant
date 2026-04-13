import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/bookings`);
      setBookings(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings", error);
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.delete(`${API_URL}/api/bookings/${id}`);
        setBookings(bookings.filter(b => b._id !== id));
      } catch (error) {
        console.error("Error deleting booking", error);
      }
    }
  };

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div className="booking-list">
      <h1>Bookings</h1>
      <p>Manage your restaurant's table bookings.</p>
      <div style={{ padding: '20px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', marginTop: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Customer Name</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Phone</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Persons</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date & Time</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>{booking.name}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>{booking.phone}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>{booking.email}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>{booking.persons}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                  {new Date(booking.date).toLocaleDateString()} at {booking.time}
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '0.8rem',
                    background: booking.status === 'Confirmed' ? '#e8f5e9' : (booking.status === 'Cancelled' ? '#ffebee' : '#fff3e0'),
                    color: booking.status === 'Confirmed' ? '#2e7d32' : (booking.status === 'Cancelled' ? '#c62828' : '#ef6c00')
                  }}>
                    {booking.status}
                  </span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                  <button onClick={() => deleteBooking(booking._id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && <p style={{ textAlign: 'center', marginTop: '20px' }}>No bookings found.</p>}
      </div>
    </div>
  );
};

export default BookingList;
