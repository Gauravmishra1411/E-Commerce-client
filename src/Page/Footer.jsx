import "../App.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-section">
          <h3>MyShop</h3>
          <p>Your one-stop online store</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>FAQ</li>
            <li>Returns</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <span>🌐</span>
            <span>📘</span>
            <span>📸</span>
            <span>🐦</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
