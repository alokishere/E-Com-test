import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import instance from "../api/AxiosConfig";
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log({fullName:fullName, mobile:mobile, password:password});
    if (!fullName.trim() || !mobile.trim() || !password.trim()) {
      toast.error("All fields are required!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    const user = {
      id: Date.now(),
      fullName,
      mobile,
      password,
      isAdmin: false,
    };

    setLoading(true);

    try {
      instance
        .post("/api/auth/register", user)
        .then((response) => {
          console.log(response);
          localStorage.setItem("user", JSON.stringify(response.data));
          toast.success("Registration successful!");
          navigate("/profile");
        })
        .catch((err) => {
          console.error("Registration error:", err);
          toast.error(err.response?.data?.message || "Registration failed!");
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed!");
      setLoading(false);
    }
  };

  const isUser = JSON.parse(localStorage.getItem("user"));
  if (isUser) {
    navigate("/profile");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Section */}
          <div className="hidden lg:flex flex-col justify-center items-center lg:items-start text-white px-8">
            {/* Logo */}
            <div className="mb-8 transform hover:scale-110 transition-transform duration-300">
              <img src="/logo.png" alt="Lebrostone" className=" h-20 drop-shadow-lg" />
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black mb-6 leading-tight drop-shadow-lg">
              Join Us
            </h1>

            {/* Description */}
            <p className="text-xl font-light mb-10 leading-relaxed drop-shadow-md max-w-sm">
              Start your journey with Lebrostone and discover premium quality products at your fingertips
            </p>

            {/* About Button */}
            <button className="px-8 py-3 bg-white text-emerald-600 font-bold rounded-full hover:bg-emerald-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              About Us
            </button>

            {/* Stats Section */}
            <div className="mt-16 pt-8 border-t border-white/30 w-full">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-black mb-2">50K+</p>
                  <p className="text-sm font-light">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-black mb-2">100%</p>
                  <p className="text-sm font-light">Quality Guaranteed</p>
                </div>
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
                Register Here
              </h2>
              <p className="text-gray-600 text-sm mb-8 text-center lg:text-left">
                Create your account to start shopping
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 w-5 h-5 text-emerald-500" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 hover:border-gray-300"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

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
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-4 w-5 h-5 text-emerald-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
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
                  <p className="text-xs text-gray-500 mt-2">
                    Minimum 6 characters
                  </p>
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Register</span>
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

              {/* Sign In Link */}
              {/* {conine with google} */}
              <button className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-100 transition-all duration-300">
                <FcGoogle size={20} />
                <span>Continue with Google</span>
              </button>

              {/* Register Link */}

              <p className="text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-emerald-600 hover:underline font-semibold">
                  Sign In
                </Link>
              </p>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-600 leading-relaxed">
                  By registering, you agree to our{" "}
                  <a href="#" className="text-emerald-600 hover:underline font-semibold">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-emerald-600 hover:underline font-semibold">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;