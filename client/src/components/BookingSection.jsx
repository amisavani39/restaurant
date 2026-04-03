
import React, { useState } from "react";
import axios from "axios";

const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    persons: "",
    date: "",
    time: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        persons: parseInt(formData.persons)
      };
      const res = await axios.post("http://localhost:5000/api/bookings/book", dataToSubmit);
      setMessage(res.data.message || "Table booked successfully!");
      setFormData({ name: "", phone: "", email: "", persons: "", date: "", time: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error booking table. Please try again later.");
    }
  };

  return (
    <section className="booking-section" id="book">
      <div className="container">
        <h2 className="section-title">Book A Table</h2>

        <div className="booking-container">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input-field"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="input-field"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <select
                name="persons"
                className="input-field select-field"
                value={formData.persons}
                onChange={handleChange}
                required
              >
                <option value="" disabled>How many persons?</option>
                <option value="2">2 Persons</option>
                <option value="4">4 Persons</option>
                <option value="6">6 Persons</option>
              </select>

              <input
                type="date"
                name="date"
                className="input-field"
                value={formData.date}
                onChange={handleChange}
                required
              />

              <input
                type="time"
                name="time"
                className="input-field"
                value={formData.time}
                onChange={handleChange}
                required
              />

              <button type="submit" className="book-btn">BOOK NOW</button>
            </form>
            {message && (
              <p style={{
                marginTop: "20px",
                color: message.toLowerCase().includes("error") ? "red" : "green",
                fontWeight: "600"
              }}>
                {message}
              </p>
            )}
          </div>

          <div className="map-container">
            <iframe
              title="location-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.5014182350574!2d72.61504507477505!3d23.188390410120924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b583b26a227%3A0x6e6223ac07ea4401!2sLa%20Crest%20Restaurant%20%26%20Banquet!5e0!3m2!1sen!2sin!4v1774865991229!5m2!1sen!2sin"
              height="100%"
              width="100%"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>  
      </div>
    </section>
  );
};

export default BookingSection;
