import Cart from "./components/Cart";
import Navbar from "./components/navbar";
import ProductList from "./components/ProductList";
import "./index.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-layout">
        <ProductList />
        <Cart />
      </main>
    </div>
  );
}

export default App;
