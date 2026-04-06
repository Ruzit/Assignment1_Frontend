import { useState } from "react";
import api from "../services/api";

function ProductCard({ product, onCartChange, onOpenProduct }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  let imageSrc;

  try {
    imageSrc = new URL(`../assets/${product.image}`, import.meta.url).href;
  } catch {
    imageSrc = "https://via.placeholder.com/200?text=No+Image";
  }

  const handleAddToCart = async (e) => {
    e.stopPropagation();

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
    <div
      className="product-card clickable-card"
      onClick={() => onOpenProduct(product)}
    >
      <div className="image-container">
        {!imageLoaded && <div className="image-skeleton" />}

        <img
          src={imageSrc}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x400?text=Image+Not+Available";
            setImageLoaded(true);
          }}
          className={imageLoaded ? "loaded" : "hidden"}
        />
      </div>

      <h3>{product.name}</h3>
      <span className={`category-badge ${product.category.toLowerCase()}`}>
        {product.category}
      </span>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
