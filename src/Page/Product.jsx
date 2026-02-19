import React, { useState, useEffect } from "react";
import "../App.css";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);//
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (selectedProduct && !token) {
      navigate("/login");
    }
  }, [selectedProduct, token, navigate]);

  // Search handler
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term),
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="app">
      {loading && <div className="loading">Loading products...</div>}

      {!loading && selectedProduct && token && (
        <Payment
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      )}

      {!loading && !selectedProduct && (
        <>
          <header className="header">
            <h1>Product Store</h1>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </header>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.thumbnail} alt={product.title} />
                <h3>{product.title}</h3>
                <p className="price">${product.price}</p>
                <p className="description">
                  {product.description.slice(0, 60)}...
                </p>
                <button
                  className="buy-btn"
                  onClick={() => setSelectedProduct(product)}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
