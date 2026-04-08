import { useEffect, useState } from "react";
import api from "../services/api";
import FilterBar from "./FilterBar";
import ProductCard from "./ProductCard";

function ProductList({ onCartChange, onOpenProduct, showToast }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Track the current search, category, and sort selections from the filter bar.
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    sort: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);

      // Only send filter values that are currently active to the products API.
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
    // Refetch products whenever any filter or sort option changes.
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // Reuse the input/select name attribute to update the matching filter field.
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    // Restore the default view by clearing every active filter and sort value.
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
        // Show an empty state when no products match the current filters.
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {/* Render each returned product as an interactive card in the grid. */}
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onCartChange={onCartChange}
              onOpenProduct={onOpenProduct}
              showToast={showToast}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;
