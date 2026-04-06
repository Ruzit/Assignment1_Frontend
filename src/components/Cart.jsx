import { useEffect, useState } from "react";
import api from "../services/api";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

function Cart({ cartUpdated, onCartChange }) {
  const [cartItems, setCartItems] = useState([]);
  const [summary, setSummary] = useState({ totalItems: 0, totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCartData = async () => {
    try {
      // setLoading(true);

      const cartResponse = await api.get("/cart");
      const summaryResponse = await api.get("/cart/summary");

      setCartItems(cartResponse.data.data);
      setSummary(summaryResponse.data.data);
      setError("");
    } catch (err) {
      console.error("Cart fetch error:", err);
      setError("Failed to load cart");
    }
    //  finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    fetchCartData();
    setLoading(false);
  }, [cartUpdated]);

  const handleClearCart = async () => {
    try {
      await api.delete("/cart");
      onCartChange();
    } catch (error) {
      console.error("Clear cart error:", error);
      alert("Failed to clear cart");
    }
  };

  if (loading) {
    return (
      <aside className="cart-section">
        <h2>Shopping Cart</h2>
        <p>Loading cart...</p>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="cart-section">
        <h2>Shopping Cart</h2>
        <p>{error}</p>
      </aside>
    );
  }

  return (
    <aside className="cart-section">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        {cartItems.length > 0 && (
          <button className="clear-cart-btn" onClick={handleClearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onCartChange={onCartChange}
              />
            ))}
          </div>
          <CartSummary summary={summary} />
        </>
      )}
    </aside>
  );
}

export default Cart;
