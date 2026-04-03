import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./product.css";

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
  const API_URL = "http://localhost:5000";

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_URL}/${imagePath}`;
  };

  const addToCart = async () => {
    if (!user) {
      alert("Please login to add to cart");
      return;
    }

    await fetch(`${API_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        product: {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      }),
    });

    alert("Added to cart ✅");
  };

  return (
    <div className="food-card">
      <img src={getImageUrl(product.image)} alt="" className="food-img" />

      <div className="food-content">
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="food-footer">
          <span>₹{product.price}</span>
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;