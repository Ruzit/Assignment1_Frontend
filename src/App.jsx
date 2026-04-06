import { useState } from "react";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import "./index.css";

function App() {
  const [cartUpdated, setCartUpdated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCartChange = () => {
    setCartUpdated((prev) => !prev);
  };

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="app">
      <Navbar />
      <main className="main-layout">
        <ProductList
          onCartChange={handleCartChange}
          onOpenProduct={handleOpenProduct}
        />
        <Cart cartUpdated={cartUpdated} onCartChange={handleCartChange} />
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseProduct}
          onCartChange={handleCartChange}
        />
      )}
    </div>
  );
}

export default App;
