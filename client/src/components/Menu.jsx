import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import '../App.css'; 

const Menu = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/food`);
      setMenuItems(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching foods", error);
      setLoading(false);
    }
  };

  const handleAddToCart = async (item) => {
    const success = await addToCart(item);
    if (success) {
      alert("Added to cart ✅");
    }
  };

  const filters = ['All', ...new Set(menuItems.map(item => item.category))];

  const filteredItems = activeFilter === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeFilter);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    if (imagePath.startsWith("http") || imagePath.startsWith("/")) return imagePath;
    if (imagePath.startsWith("image/")) return `/${imagePath}`;
    return `${API_URL}/${imagePath}`;
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading menu...</div>;
  }

  return (
    <section className="menu-section">
      <div className="container">
        <h2 className="section-title">Our Menu</h2>
        
        <ul className="menu-filter">
          {filters.map(filter => (
            <li
              key={filter}
              className={activeFilter === filter ? 'active' : ''}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </li>
          ))}
        </ul>

        <div className="menu-wrapper">
          {filteredItems.map((item, index) => (
            <div 
              className="card" 
              key={item._id || item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="img-box">
                <img src={getImageUrl(item.image)} alt={item.name || item.title} />
                <span className="category-tag">{item.category}</span>
              </div>
              <div className="info-box">
                <h3>{item.name || item.title}</h3>
                <p>{item.description}</p>
                <div className="card-footer">
                  <span className="price">₹{item.price}</span>
                  <button className="cart-btn" title="Add to Cart" onClick={() => handleAddToCart(item)}>
                    <i className="fa fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="btn-box">
          <button className="view-more">View More</button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
