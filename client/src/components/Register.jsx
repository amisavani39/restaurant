import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Mocking a successful registration for now
      // const response = await axios.post('/api/auth/register', formData);
      
      console.log('Registering with:', formData);
      
      // Simulate API delay
      setTimeout(() => {
        setLoading(false);
        alert('Registration successful! (Mocked)');
        navigate('/login');
      }, 1000);

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div>
        <div className="hero_area" style={{ minHeight: "450px" }}>
          <div className="bg-box">
            <img src="/image/hero-bg.jpg" alt="bg" />
          </div>
          <Navbar />
        </div>

      <section className="booking-section">
        <div className="container">
          <div className="heading_container" style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 className="section-title">Register</h2>
          </div>
          <div className="booking-container" style={{ justifyContent: 'center' }}>
            <div className="form-container" style={{ maxWidth: '500px' }}>
              <form onSubmit={handleSubmit}>
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <div>
                  <input
                    type="text"
                    name="name"
                    className="input-field"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    className="input-field"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    className="input-field"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="input-field"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="btn_box" style={{ textAlign: 'center' }}>
                  <button type="submit" className="book-btn" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                  </button>
                </div>
              </form>
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p>Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)' }}>Login here</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Register;
