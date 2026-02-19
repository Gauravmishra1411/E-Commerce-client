import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://e-commerce-api-git-main-gaurav-kumars-projects-16fed660.vercel.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/products");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer position="top-right" />

      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Login Account</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <button type="submit">Login</button>

        {/* 🔗 Signup link below login button */}
        <p style={{ marginTop: "12px", fontSize: "14px" }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#007bff" }}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
