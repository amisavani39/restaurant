import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { AuthContext } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaUser, FaArrowRight } from 'react-icons/fa';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

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
    setError('');
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    
    try {
      // Mocking API call
      setTimeout(() => {
        if (isLogin) {
          const mockUser = { name: 'User', email: formData.email, _id: '123' };
          login(mockUser);
          navigate('/');
        } else {
          alert('Registration successful! Now please login.');
          setIsLogin(true);
        }
        setLoading(false);
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth_page">
      <div className="hero_area" style={{ minHeight: "350px" }}>
        <div className="bg-box">
          <img src="/image/hero-bg.jpg" alt="bg" />
        </div>
        <Navbar />
      </div>

      <section className="auth_section py-5">
        <div className="container">
          <div className="auth_container shadow-lg" data-aos="zoom-in">
            <div className={`auth_slider ${isLogin ? '' : 'active'}`}>
              <div className="slider_content">
                <h2>{isLogin ? "Hello, Friend!" : "Welcome Back!"}</h2>
                <p>{isLogin ? "Enter your personal details and start journey with us" : "To keep connected with us please login with your personal info"}</p>
                <button className="ghost_btn" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </div>

            <div className="form_container login_form">
              <form onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                {error && <p className="error_msg">{error}</p>}
                <div className="input_group">
                  <FaEnvelope className="icon" />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="input_group">
                  <FaLock className="icon" />
                  <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="auth_btn" disabled={loading}>
                  {loading ? "Processing..." : "Sign In"}
                </button>
              </form>
            </div>

            <div className="form_container register_form">
              <form onSubmit={handleSubmit}>
                <h2>Create Account</h2>
                {error && <p className="error_msg">{error}</p>}
                <div className="input_group">
                  <FaUser className="icon" />
                  <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required={!isLogin} />
                </div>
                <div className="input_group">
                  <FaEnvelope className="icon" />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required={!isLogin} />
                </div>
                <div className="input_group">
                  <FaLock className="icon" />
                  <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required={!isLogin} />
                </div>
                <div className="input_group">
                  <FaLock className="icon" />
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required={!isLogin} />
                </div>
                <button type="submit" className="auth_btn" disabled={loading}>
                  {loading ? "Processing..." : "Sign Up"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Auth;
