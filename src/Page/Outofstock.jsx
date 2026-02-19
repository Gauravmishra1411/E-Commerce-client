import "../App.css";

const OutOfStock = ({ title }) => {
  return (
    <div className="outofstock-card">
      <h3>{title}</h3>
      <p className="outofstock-text">Out of Stock</p>
      <button className="outofstock-btn" disabled>
        Not Available
      </button>
    </div>
  );
};

export default OutOfStock;
