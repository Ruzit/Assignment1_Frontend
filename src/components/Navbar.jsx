function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="logo">🛍️ ShopEase</h1>
      </div>

      <div className="navbar-right">
        <div className="cart-icon">
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
