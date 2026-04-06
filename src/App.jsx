import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import api from "./services/api";

function App() {
  const [cartUpdated, setCartUpdated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const handleCartChange = () => {
    setCartUpdated((prev) => !prev);
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

      <main className="main-layout">
        <ProductList
          onCartChange={handleCartChange}
          onOpenProduct={setSelectedProduct}
        />
        <Cart cartUpdated={cartUpdated} onCartChange={handleCartChange} />
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onCartChange={handleCartChange}
        />
      )}
    </div>
  );
}

export default App;
