 import { useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        MyStore
      </div>

      <ul className="nav-links">
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/service")}>Services</li>
        <li onClick={() => navigate("/contact")}>Contact</li>
      </ul>

      <div className="nav-auth">
        {!localStorage.getItem("token") ? (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
