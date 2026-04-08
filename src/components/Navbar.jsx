function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        {/* Brand title displayed at the top of the storefront. */}
        <h1 className="logo">🛍️ ShopEase</h1>
      </div>

      <div className="navbar-right">
        <div className="cart-icon">
          🛒
          {/* Only show the badge when there are items in the cart. */}
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
