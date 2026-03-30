import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/api/cart/123")
      .then(res => res.json())
      .then(data => setCart(data?.items || []))
      .catch(err => console.error("Error fetching cart:", err));
  }, []);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity} x ₹{item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
