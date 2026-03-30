import React, { useState, useContext } from 'react';

import '../App.css'; // Assuming styles are in App.css

const Menu = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const menuItems = [
    {
      id: 1,
      title: "Delicious Pizza",
      category: "Pizza",
      description: "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: "$20",
      image: "/image/f1.png"
    },
    {
      id: 2,
      title: "Delicious Burger",
      category: "Burger",
      description: "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: "$15",
      image: "/image/f3.png"
    },
    {
      id: 3,
      title: "Delicious Pasta",
      category: "Pasta",
      description: "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: "$18",
      image: "/image/f6.png"
    },
    {
      id: 4,
      title: "French Fries",
      category: "Fries",
      description: "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: "$10",
      image: "/image/f1.png"
    },
    {
      id: 5,
      title: "Tasty Burger",
      category: "Burger",
      description: "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: "$12",
      image: "/image/f3.png"
    },
    {
      id: 6,
      title: "Tasty Pizza",
      category: "Pizza",
      description: "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: "$12",
      image: "/image/f6.png"
    },
    {
      id: 7,
      title: "Spicy Pizza",
      category: "Pizza",
      description: "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: "$18",
      image: "/image/f1.png"
    },
    {
      id: 8,
      title: "Cheesy Burger",
      category: "Burger",
      description: "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: "$14",
      image: "/image/f3.png"
    },
    {
      id: 9,
      title: "Creamy Pasta",
      category: "Pasta",
      description: "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: "$16",
      image: "/image/f6.png"
    }
  ];

  const filters = ['All', 'Burger', 'Pizza', 'Pasta', 'Fries'];

  const filteredItems = activeFilter === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeFilter);

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
          {filteredItems.map(item => (
            <div className="card" key={item.id}>
              <div className="img-box">
                <img src={item.image} alt={item.title} />
                <span className="category-tag">{item.category}</span>
              </div>
              <div className="info-box">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="card-footer">
                  <span className="price">{item.price}</span>
                  <button className="cart-btn">
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
