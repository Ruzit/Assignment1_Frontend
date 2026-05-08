import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import Register from "./components/Register";
import Toast from "./components/Toast";
import "./index.css";
import api from "./services/api";

function App() {
  const [cartUpdated, setCartUpdated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [authMode, setAuthMode] = useState("login");

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const handleCartChange = () => {
    setCartUpdated((prev) => !prev);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCartUpdated((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCartCount(0);
    showToast("Logged out successfully", "success");
  };

  const fetchCartCount = async () => {
    if (!user) return;

    try {
      const res = await api.get("/cart/summary");
      setCartCount(res.data.data.totalItems);
    } catch (err) {
      console.error("Cart count error:", err);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, [cartUpdated, user]);

  return (
    <div className="app">
      <Navbar user={user} cartCount={cartCount} onLogout={handleLogout} />

      <Toast message={toast.message} type={toast.type} />

      {!user ? (
        <div className="auth-page">
          {authMode === "login" ? (
            <Login
              onLogin={handleLogin}
              showToast={showToast}
              switchToRegister={() => setAuthMode("register")}
            />
          ) : (
            <Register
              onLogin={handleLogin}
              showToast={showToast}
              switchToLogin={() => setAuthMode("login")}
            />
          )}
        </div>
      ) : (
        <>
          <main className="main-layout">
            <ProductList
              onCartChange={handleCartChange}
              onOpenProduct={setSelectedProduct}
              showToast={showToast}
            />

            <Cart
              cartUpdated={cartUpdated}
              onCartChange={handleCartChange}
              showToast={showToast}
            />
          </main>

          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onCartChange={handleCartChange}
              showToast={showToast}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
