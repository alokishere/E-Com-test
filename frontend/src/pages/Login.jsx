import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../api/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance
        .post("/api/auth/login", { mobile, password })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          toast.success("Login successful!");
          navigate("/profile");
        })
        .catch((error) => {
          toast.error("Login error:", error.message);
          console.error("Login error:", error.message);
        });
    } catch (error) {
      toast.error("Login while fetching error:", error.message);
      console.error("Login while fetching error:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Mobile Number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={mobile}
            onChange={(e) => setmobile(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors font-semibold"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
