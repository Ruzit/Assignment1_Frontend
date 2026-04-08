import { useState } from "react";
import api from "../services/api";

function ProductCard({ product, onCartChange, onOpenProduct }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  let imageSrc;

  try {
    // Resolve the product image from the local assets folder when available.
    imageSrc = new URL(`../assets/${product.image}`, import.meta.url).href;
  } catch {
    // Fall back to a placeholder if the referenced asset does not exist.
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
        {/* Keep a skeleton visible until the product image finishes loading. */}
        {!imageLoaded && <div className="image-skeleton" />}

        <img
          src={imageSrc}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            // Replace broken images with a generic placeholder and reveal it immediately.
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
