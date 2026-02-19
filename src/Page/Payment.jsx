 import { useState } from "react";
import "../App.css";

const Payment = ({ product, onBack }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [priceUSD, setPriceUSD] = useState((product.price / 82).toFixed(2)); // INR → USD
  const [currency, setCurrency] = useState("INR"); // "INR" or "USD"

  // Handle input change with validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber" || name === "cvv" || name === "expiry") {
      // Only digits
      setFormData({ ...formData, [name]: value.replace(/\D/g, "") });
    } else if (name === "cardName") {
      // Only letters and spaces
      setFormData({ ...formData, [name]: value.replace(/[^a-zA-Z\s]/g, "") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to buy this product");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/payment/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product,
          cardDetails: formData,
          amount: currency === "INR" ? product.price : priceUSD,
          currency,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Payment failed. Simulating payment...");
        alert(`Payment successful for ${product.title} (simulated)`);
        onBack();
        return;
      }

      const data = await res.json();
      alert(`Payment successful for ${product.title}!`);
      onBack();
    } catch (error) {
      console.error(error);
      alert(`Server error. Payment simulated for ${product.title}`);
      onBack();
    }
  };

  return (
    <div className="payment-container">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="payment-card">
        <h2>Payment for {product.title}</h2>

        {/* Currency toggle */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="radio"
              name="currency"
              value="INR"
              checked={currency === "INR"}
              onChange={() => setCurrency("INR")}
            />
            INR (₹)
          </label>

          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              name="currency"
              value="USD"
              checked={currency === "USD"}
              onChange={() => setCurrency("USD")}
            />
            USD ($)
          </label>
        </div>

        <p className="total">
          Total: {currency === "INR" ? `₹${product.price}` : `$${priceUSD}`}
        </p>

        <form onSubmit={handlePayment}>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            maxLength={16}
            required
          />

          <input
            type="text"
            name="cardName"
            placeholder="Cardholder Name"
            value={formData.cardName}
            onChange={handleChange}
            required
          />

          <div className="row">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={formData.expiry}
              onChange={handleChange}
              maxLength={4}
              required
            />
            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              maxLength={3}
              required
            />
          </div>

          <button type="submit" className="pay-btn">
            Pay {currency === "INR" ? `₹${product.price}` : `$${priceUSD}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
