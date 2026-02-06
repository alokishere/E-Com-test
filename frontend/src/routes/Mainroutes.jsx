// React Router imports
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductDetails from "../components/cards/ProductDetails";
import CreateProduct from "../components/cards/CreateProduct";
import Cart from "../pages/Cart";
const Mainroutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {user ? (<>
      <Route path="/login" element={<Navigate to="/profile" />} />
      <Route path="/register" element={<Navigate to="/profile" />} />
      </>
      ) : (
        <>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </>
      )}
      <Route path="/products" element={<Products />} />
      <Route path="/product/:_id" element={<ProductDetails />} />
      <Route path="/admin/create-product" element={<CreateProduct />} />
    
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default Mainroutes;
