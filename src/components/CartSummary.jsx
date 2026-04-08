function CartSummary({ summary }) {
  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      {/* Display the totals returned by the cart summary API endpoint. */}
      <p>Total Items: {summary.totalItems}</p>
      <p>Total Price: ${summary.totalPrice}</p>
    </div>
  );
}

export default CartSummary;
