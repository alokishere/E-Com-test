import React, { useState } from "react";
import { CiUser, CiSearch, CiShoppingBasket } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import {
  IoChevronDown,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/cart?userId=${user.id}`)
        .then((response) => {
          setCartCount(response.data.length);
        })
        .catch((err) => {
          console.error("Error fetching cart count:", err);
        });
    }
  }, [user?.id]);

  const navItems = [
    { name: "SHOP ALL", hasDropdown: false, path: "/products" },
    { name: "SKIN", hasDropdown: false },
    { name: "BATH & BODY", hasDropdown: false },
    { name: "HAIR", hasDropdown: false },
    { name: "MEN", hasDropdown: false },
    { name: "SPA", hasDropdown: false },
    { name: "ANANTAM", hasDropdown: false },
    { name: "WEDDING EDITS", hasDropdown: false },
    { name: "COMBOS", hasDropdown: false },
    { name: "SHOP BY", hasDropdown: true },
    { name: "OUR STORY", hasDropdown: false },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF6EA] shadow-md font-sans">
      {/* Top Banner */}
      <div className="bg-[#C5A987] text-white py-2 px-4 flex justify-center items-center relative text-[10px] md:text-xs font-thin tracking-widest">
        <button className="absolute left-4 md:left-20 text-white/80 hover:text-white">
          <IoChevronBack size={16} />
        </button>
        <span>
          GET 10% OFF YOUR FIRST ORDER – USE CODE{" "}
          <span className="font-bold">LEBROSTONE10!</span>
        </span>
        <button className="absolute right-4 md:right-20 text-white/80 hover:text-white">
          <IoChevronForward size={16} />
        </button>
      </div>

      {/* Main Header Area (Logo & Icons) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="flex items-center justify-between">
          {/* Left: House of Baidyanath (Placeholder/Text) */}
          <div className="hidden md:flex flex-col text-[10px] items-start font-bold text-gray-800 leading-tight">
            <span className="h-15 w-auto ">
              <img className="h-full w-full " src="/logo.jpg" alt="" />
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-800"
            onClick={() => setMobileMenuOpen(true)}
          >
            <HiMenuAlt3 />
          </button>

          {/* Center: Brand Logo */}
          <div className="flex-1 flex justify-center mb-4">
            <h1 className="text-3xl   font-serif tracking-wide text-[#C5A987]">
              LEBROSTONE
            </h1>
          </div>

          {/* Right: Icons & Badge */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3 md:gap-4 text-gray-800">
              <button
                onClick={() => navigate("/profile")}
                className="hover:text-[#C5A987] transition-colors"
              >
                <CiUser size={24} strokeWidth={0.5} />
              </button>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hover:text-[#C5A987] transition-colors"
              >
                <CiSearch size={24} strokeWidth={0.5} />
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="relative hover:text-[#C5A987] transition-colors"
              >
                <CiShoppingBasket size={24} strokeWidth={0.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Circular Badge (Desktop Only) */}
            <div className="md:block w-12 h-12 border border-gray-800 rounded-full flex items-center justify-center p-1 opacity-80">
              <div className="text-[6px] text-center leading-none font-bold text-gray-800 uppercase">
                Research
                <br />
                Foundation
                <br />
                Since 1917
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links (Desktop) */}
      <div className="hidden md:block border-b border-gray-100/50 pb-4">
        <div className="flex justify-center items-center gap-8 text-[11px] lg:text-xs font-medium tracking-widest text-gray-700">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer relative"
              onClick={() => item.path && navigate(item.path)}
            >
              <span className="hover:text-[#C5A987] transition-colors duration-300">
                {item.name}
              </span>
              {/* Hover Underline */}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C5A987] transition-all duration-300 group-hover:w-full"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg p-4 animate-slideDown z-40 border-t border-gray-100">
          <div className="max-w-4xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-4 pr-12 py-2 border-b border-gray-300 focus:outline-none focus:border-[#C5A987] text-sm"
              autoFocus
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
              <CiSearch size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[#FAF6EA] shadow-xl p-6 overflow-y-auto transition-transform duration-300 transform translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif text-[#C5A987]">LEBROSTONE</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600"
              >
                <IoMdClose size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {navItems.map((item, index) => (
                <div key={index} className="border-b border-gray-200/50 pb-2">
                  <div className="flex justify-between items-center text-sm font-medium text-gray-700">
                    {item.name}
                    {item.hasDropdown && <IoChevronDown size={14} />}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4 pt-4 border-t border-gray-300">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <CiUser size={20} /> My Account
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <span className="w-5 h-5 flex items-center justify-center font-serif italic text-xs">
                  ?
                </span>{" "}
                Help & Support
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
