function FilterBar({ filters, onFilterChange, onResetFilters }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        name="name"
        placeholder="Search by product name"
        value={filters.name}
        onChange={onFilterChange}
      />

      <select
        name="category"
        value={filters.category}
        onChange={onFilterChange}
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Accessories">Accessories</option>
        <option value="Home">Home</option>
        <option value="Fitness">Fitness</option>
        <option value="Stationery">Stationery</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>

      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={onFilterChange}
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={onFilterChange}
      />

      <select name="sort" value={filters.sort} onChange={onFilterChange}>
        <option value="">Sort By</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="name_asc">Name: A to Z</option>
        <option value="name_desc">Name: Z to A</option>
      </select>

      <button className="reset-btn" onClick={onResetFilters}>
        Reset
      </button>
    </div>
  );
}

export default FilterBar;
