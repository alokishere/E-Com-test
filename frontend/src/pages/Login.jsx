import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../api/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import { Phone, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mobile.trim() || !password.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);

    try {
      const response = await instance.post("/api/auth/login", { mobile, password });
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Login successful!");
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 overflow-hidden flex items-center justify-center p-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Section */}
          <div className="hidden lg:flex flex-col justify-center items-center lg:items-start text-white px-8">
            {/* Logo */}
            <div className="mb-8 transform hover:scale-110 transition-transform duration-300">
              <img src="/logo.png" alt="Lebrostone" className="h-20 drop-shadow-lg" />
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black mb-6 leading-tight drop-shadow-lg">
              Welcome Back
            </h1>

            {/* Description */}
            <p className="text-xl font-light mb-10 leading-relaxed drop-shadow-md max-w-sm">
              Sign in to your Lebrostone account and continue shopping for premium quality products
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-12">
              <div className="flex items-center gap-3 group">
                <div className="shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-light group-hover:font-medium transition-all">
                  Secure & Fast Login
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-light group-hover:font-medium transition-all">
                  Access Your Orders
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-light group-hover:font-medium transition-all">
                  Exclusive Member Benefits
                </span>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-12 pt-8 border-t border-white/30 w-full">
              <p className="text-sm font-light text-white/80 mb-4">TRUSTED BY THOUSANDS</p>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-white text-xs font-bold backdrop-blur-sm"
                    >
                      {i}K
                    </div>
                  ))}
                </div>
                <span className="text-lg font-light">
                  Active Users
                </span>
              </div>
            </div>
          </div>

          {/* Right Section - Form Card */}
          <div className="w-full">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 transform hover:shadow-3xl transition-shadow duration-300">
              {/* Mobile Header */}
              <div className="lg:hidden mb-8 text-center">
                <img src="/logo.png" alt="Lebrostone" className="w-16 h-16 mx-auto mb-4" />
                <h1 className="text-2xl font-black text-gray-800">Lebrostone</h1>
              </div>

              {/* Form Header */}
              <h2 className="text-3xl font-black text-gray-800 mb-2 text-center lg:text-left">
                Sign In
              </h2>
              <p className="text-gray-600 text-sm mb-8 text-center lg:text-left">
                Enter your credentials to access your account
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Mobile Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 w-5 h-5 text-emerald-500" />
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 hover:border-gray-300"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold text-gray-800">
                      Password
                    </label>
                    <a href="#" className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-4 w-5 h-5 text-emerald-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 hover:border-gray-300"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 text-gray-400 hover:text-emerald-500 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-600 font-medium">
                    or
                  </span>
                </div>
              </div>

              {/* Register Link */}
              <Link
                to="/register"
                className="w-full block text-center py-3 px-4 border-2 border-emerald-500 text-emerald-600 font-bold rounded-full hover:bg-emerald-50 transition-all duration-300"
              >
                Create New Account
              </Link>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-600 leading-relaxed">
                  By signing in, you agree to our{" "}
                  <a href="#" className="text-emerald-600 hover:underline font-semibold">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-emerald-600 hover:underline font-semibold">
                    Privacy Policy
                  </a>
                </p>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-emerald-600">
                <Lock className="w-4 h-4" />
                <span className="text-xs font-semibold">Secure SSL Connection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;