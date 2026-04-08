import { useState } from "react";
import api from "../services/api";

function ProductModal({ product, onClose, onCartChange, showToast }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  let imageSrc;

  try {
    // Resolve the selected product image from the local assets folder.
    imageSrc = new URL(`../assets/${product.image}`, import.meta.url).href;
  } catch {
    // Use a placeholder when the expected asset file is missing.
    imageSrc = "https://via.placeholder.com/200?text=No+Image";
  }

  const handleAddToCart = async () => {
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
    // Clicking the overlay closes the modal, while clicks inside the panel do not.
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>

        <div className="modal-image-wrapper">
          {/* Show a skeleton until the larger product image has loaded. */}
          {!imageLoaded && <div className="image-skeleton modal-skeleton" />}
          <img
            src={imageSrc}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              // Swap in a fallback image if the modal image fails to load.
              e.target.src = "https://via.placeholder.com/300?text=No+Image";
              setImageLoaded(true);
            }}
            className={imageLoaded ? "loaded" : "hidden"}
          />
        </div>

        <div className="modal-content">
          <h2>{product.name}</h2>
          <div className="modal-category-row">
            <strong>Category:</strong>
            <span
              className={`category-badge ${product.category.toLowerCase()}`}
            >
              {product.category}
            </span>
          </div>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>{product.description}</p>

          <button className="modal-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
