import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import Toast from "./components/Toast";
import "./index.css";
import api from "./services/api";

function App() {
  const [cartUpdated, setCartUpdated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const handleCartChange = () => {
    setCartUpdated((prev) => !prev);
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const fetchCartCount = async () => {
    try {
      const res = await api.get("/cart/summary");
      setCartCount(res.data.data.totalItems);
    } catch (err) {
      console.error("Cart count error:", err);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, [cartUpdated]);

  return (
    <div className="app">
      <Navbar cartCount={cartCount} />

      <Toast message={toast.message} type={toast.type} />

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
    </div>
  );
}

export default App;
