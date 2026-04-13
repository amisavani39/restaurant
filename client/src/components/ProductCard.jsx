import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import "./product.css";

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    if (imagePath.startsWith("http") || imagePath.startsWith("/")) return imagePath;
    if (imagePath.startsWith("image/")) return `/${imagePath}`;
    return `${API_URL}/${imagePath}`;
  };

  const handleAddToCart = async () => {
    const success = await addToCart(product);
    if (success) {
      alert("Added to cart ✅");
    }
  };

  return (
    <div className="food-card">
      <img src={getImageUrl(product.image)} alt="" className="food-img" />

      <div className="food-content">
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="food-footer">
          <span>₹{product.price}</span>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;