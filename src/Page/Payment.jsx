 import { useState } from "react";
import "../App.css";

const Payment = ({ product, onBack }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle payment submit
  const handlePayment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to buy this product");
      return;
    }

    try {
      const res = await fetch("https://e-commerce-api-git-main-gaurav-kumars-projects-16fed660.vercel.app/api/payment/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product,
          cardDetails: formData,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Payment successful for ${product.title}`);
        onBack();
      } else {
        alert(data.message || "Payment failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="payment-container">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="payment-card">
        <h2>Payment for {product.title}</h2>
        <p className="total">Total: ${product.price}</p>

        <form onSubmit={handlePayment}>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
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
              required
            />

            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="pay-btn">
            Pay ${product.price}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
