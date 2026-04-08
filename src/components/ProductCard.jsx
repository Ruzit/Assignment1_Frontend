import { useState } from "react";
import api from "../services/api";

function ProductCard({ product, onCartChange, onOpenProduct, showToast }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  let imageSrc;
  try {
    // Resolve the card image from the local assets folder for this product.
    imageSrc = new URL(`../assets/${product.image}`, import.meta.url).href;
  } catch {
    // Use a placeholder when the asset file cannot be found.
    imageSrc = "https://via.placeholder.com/200?text=No+Image";
  }

  const handleAddToCart = async (e) => {
    // Prevent the card click handler from opening the product modal.
    e.stopPropagation();

    try {
      await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      onCartChange();
      showToast("Item added to cart", "success");
    } catch (error) {
      console.error("Add to cart error:", error);
      showToast("Failed to add item to cart", "error");
    }
  };

  return (
    <div
      className="product-card clickable-card"
      // Clicking anywhere on the card opens the full product details modal.
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
            // Replace broken image URLs with a generic fallback image.
            e.target.src = "https://via.placeholder.com/200?text=No+Image";
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
