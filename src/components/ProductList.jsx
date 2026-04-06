import { useEffect, useState } from "react";
import api from "../services/api";
import FilterBar from "./FilterBar";
import ProductCard from "./ProductCard";

function ProductList({ onCartChange, onOpenProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    name: "",
    category: "",
    sort: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params = {};
      if (filters.name) params.name = filters.name;
      if (filters.category) params.category = filters.category;
      if (filters.sort) params.sort = filters.sort;

      const response = await api.get("/products", { params });
      setProducts(response.data.data);
      setError("");
    } catch (err) {
      console.error("Product fetch error:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      name: "",
      category: "",
      sort: "",
    });
  };

  if (loading) {
    return (
      <section className="products-section">
        <h2>Products</h2>
        <p>Loading products...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="products-section">
        <h2>Products</h2>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="products-section">
      <h2>Products</h2>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onCartChange={onCartChange}
              onOpenProduct={onOpenProduct}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;
