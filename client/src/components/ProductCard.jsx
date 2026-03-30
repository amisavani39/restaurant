import "./product.css";

const ProductCard = ({ product }) => {

  const addToCart = async () => {
    await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "123",
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
      <img src={product.image} alt="" className="food-img" />

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