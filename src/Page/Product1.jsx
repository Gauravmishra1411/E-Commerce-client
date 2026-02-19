import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Product1 = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔒 Protect route
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [navigate]);

  // 🔍 Search filter
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <h2>Loading products...</h2>;

  return (
    <div className="product-container">
      <h2>Products</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="product-grid">
        {filteredProducts.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>${item.price}</p>

            <button
              className="buy-btn"
              onClick={() => navigate("/outofstock", { state: { product: item } })}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product1;
