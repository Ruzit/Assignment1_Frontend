import { useState } from "react";
import api from "../services/api";

function ProductModal({ product, onClose, onCartChange }) {
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>

        <div className="modal-image-wrapper">
          {!imageLoaded && <div className="image-skeleton modal-skeleton" />}
          <img
            src={product.image}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300?text=No+Image";
              setImageLoaded(true);
            }}
            className={imageLoaded ? "loaded" : "hidden"}
          />
        </div>

        <div className="modal-content">
          <h2>{product.name}</h2>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
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
