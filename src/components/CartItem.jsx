import api from "../services/api";

function CartItem({ item, onCartChange, showToast }) {
  let imageSrc;

  try {
    // Use the matching local product image when the asset exists.
    imageSrc = new URL(`../assets/${item.productId.image}`, import.meta.url)
      .href;
  } catch {
    // Fall back to a placeholder if the image file cannot be resolved.
    imageSrc = "https://via.placeholder.com/200?text=No+Image";
  }

  const handleIncrease = async () => {
    try {
      await api.put(`/cart/${item._id}`, {
        quantity: item.quantity + 1,
      });
      onCartChange();
    } catch (error) {
      console.error("Increase quantity error:", error);
      showToast("Failed to update quantity", "error");
    }
  };

  const handleDecrease = async () => {
    // Prevent quantities from dropping below 1 from the decrement button.
    if (item.quantity === 1) return;

    try {
      await api.put(`/cart/${item._id}`, {
        quantity: item.quantity - 1,
      });
      onCartChange();
    } catch (error) {
      console.error("Decrease quantity error:", error);
      showToast("Failed to update quantity", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/cart/${item._id}`);
      onCartChange();
    } catch (error) {
      console.error("Delete cart item error:", error);
      showToast("Failed to remove item", "error");
    }
  };

  return (
    <div className="cart-item">
      <img src={imageSrc} alt={item.productId.name} />
      <div className="cart-item-details">
        <h4>{item.productId.name}</h4>
        <p>${item.productId.price}</p>
        {/* Show the running total for this cart line item. */}
        <p>Subtotal: ${item.productId.price * item.quantity}</p>

        <div className="quantity-controls">
          <button onClick={handleDecrease}>-</button>
          <span>{item.quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
      </div>

      <button className="remove-btn" onClick={handleDelete}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;
