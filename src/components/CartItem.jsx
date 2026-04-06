import api from "../services/api";

function CartItem({ item, onCartChange }) {
  const handleIncrease = async () => {
    try {
      await api.put(`/cart/${item._id}`, {
        quantity: item.quantity + 1,
      });
      onCartChange();
    } catch (error) {
      console.error("Increase quantity error:", error);
      alert("Failed to update quantity");
    }
  };

  const handleDecrease = async () => {
    if (item.quantity === 1) return;

    try {
      await api.put(`/cart/${item._id}`, {
        quantity: item.quantity - 1,
      });
      onCartChange();
    } catch (error) {
      console.error("Decrease quantity error:", error);
      alert("Failed to update quantity");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/cart/${item._id}`);
      onCartChange();
    } catch (error) {
      console.error("Delete cart item error:", error);
      alert("Failed to remove item");
    }
  };

  return (
    <div className="cart-item">
      <img src={item.productId.image} alt={item.productId.name} />
      <div className="cart-item-details">
        <h4>{item.productId.name}</h4>
        <p>${item.productId.price}</p>
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
