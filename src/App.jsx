import { useState } from "react";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import "./index.css";

function App() {
  const [cartUpdated, setCartUpdated] = useState(false);

  const handleCartChange = () => {
    setCartUpdated((prev) => !prev);
  };

  return (
    <div className="app">
      <Navbar />
      <main className="main-layout">
        <ProductList onCartChange={handleCartChange} />
        <Cart cartUpdated={cartUpdated} onCartChange={handleCartChange} />
      </main>
    </div>
  );
}

export default App;
