import { useState } from "react";
import api from "../services/api";

function ProductCard({ product, onCartChange, onOpenProduct }) {
  const [imageLoaded, setImageLoaded] = useState(false);

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
          src={product.image}
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
      <p>{product.category}</p>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
