import api from "../services/api";

function ProductCard({ product, onCartChange }) {
  const handleAddToCart = async () => {
    try {
      await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      onCartChange();
      alert("Item added to cart");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Failed to add item to cart");
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
