import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../Page/Signup";
import Product from "../Page/Product";
import Login from "../Page/Login";
import Service from "../Page/Service";
import Contact from "../Page/Contact";
import ProtectedRoute from "./ProtectedRoute";
import Payment from "../Page/Payment";
import Product1 from "../Page/Product1";
import OutOfStock from "../Page/Outofstock";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Route */}
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/service"
        element={
          <ProtectedRoute>
            <Service />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Product1 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/OutOfStock"
        element={
          <ProtectedRoute>
            <OutOfStock />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Router;
