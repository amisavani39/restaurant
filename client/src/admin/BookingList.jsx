import React from 'react';

const BookingList = () => {
  return (
    <div className="booking-list">
      <h1>Bookings</h1>
      <p>Manage your restaurant's table bookings.</p>
      <div style={{ padding: '20px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', marginTop: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Customer Name</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Phone</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Persons</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>1</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>John Doe</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>1234567890</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>john@example.com</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>4</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>03-04-2026</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                <button style={{ color: 'red' }}>Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
