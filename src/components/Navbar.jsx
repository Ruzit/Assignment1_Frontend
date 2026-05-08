function Navbar({ user, cartCount, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="logo">🛍️ ShopEase</h1>
      </div>

      <div className="navbar-right">
        {user && (
          <>
            <span className="user-label">Hi, {user.name}</span>

            <div className="cart-icon">
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>

            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
