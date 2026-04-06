function CartSummary({ summary }) {
  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      <p>Total Items: {summary.totalItems}</p>
      <p>Total Price: ${summary.totalPrice}</p>
    </div>
  );
}

export default CartSummary;
