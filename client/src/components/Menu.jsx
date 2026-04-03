import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../App.css'; 

const Menu = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const API_URL = "http://localhost:5000";

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

  const addToCart = async (item) => {
    if (!user) {
      alert("Please login to add to cart");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          product: {
            productId: item._id,
            name: item.name,
            price: item.price,
            image: item.image,
          },
        }),
      });

      if (response.ok) {
        alert("Added to cart ✅");
      } else {
        alert("Failed to add to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Error adding to cart");
    }
  };

  const filters = ['All', 'Burger', 'Pizza', 'Pasta', 'Fries'];

  const filteredItems = activeFilter === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeFilter);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    if (imagePath.startsWith("http")) return imagePath;
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
                  <span className="price">${item.price}</span>
                  <button className="cart-btn" title="Add to Cart" onClick={() => addToCart(item)}>
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
