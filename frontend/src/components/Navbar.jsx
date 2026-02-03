import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaOpencart } from "react-icons/fa";
import { FaShopLock } from "react-icons/fa6";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(3); // Example cart count
  const navigate = useNavigate();
  
  const navItems = [
    { name: "FACE", hasDropdown: true },
    { name: "BODY & BATH", hasDropdown: true },
    { name: "HAIR", hasDropdown: true },
    { name: "MEN", hasDropdown: false },
    { name: "COMBO", hasDropdown: true },
    { name: "BEST SELLERS", hasDropdown: false },
    { name: "NEW ARRIVALS", hasDropdown: false },
    { name: "SHOP BY INGREDIENTS", hasDropdown: true },
    { name: "SHOP BY CONCERN", hasDropdown: true },
    { name: "K-DERMA", hasDropdown: false },
    { name: "WOW WINTER SALE", hasDropdown: false, highlight: true },
    { name: "SUPER SAVER COMBOS", hasDropdown: true },
    { name: "SHOP BY RANGES", hasDropdown: true },
    { name: "CLEARANCE SALE", hasDropdown: false, highlight: true },
    { name: "BLOGS", hasDropdown: false },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-pink-600 via-rose-500 to-orange-500 text-white py-2 text-center text-xs md:text-sm font-medium">
        ✨ WINTER SALE: Extra 20% OFF | Free Shipping above ₹300
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-2xl hover:text-pink-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <IoMdClose /> : <HiMenuAlt3 />}
            </button>
            
            <div className="flex items-center gap-2 cursor-pointer group">
              <FaShopLock className="text-2xl md:text-3xl text-pink-600 group-hover:text-pink-700 transition-colors" />
              <span className="hidden sm:block text-xl md:text-2xl font-bold bg-linear-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
                BeautyGlow
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Scrollable */}
          <div className="hidden lg:flex items-center flex-1 mx-8 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-6 xl:gap-8 whitespace-nowrap">
              {navItems.slice(0, 8).map((item, index) => (
                <div key={index} className="relative group">
                  <button
                    className={`
                      flex items-center gap-1 text-xs font-semibold tracking-wide
                      transition-all duration-200
                      ${item.highlight 
                        ? 'text-pink-600 hover:text-pink-700' 
                        : 'text-gray-700 hover:text-pink-600'
                      }
                    `}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <IoChevronDown className="text-xs group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </button>
                  
                  {/* Dropdown indicator */}
                  {item.hasDropdown && (
                    <div className="absolute left-0 right-0 h-0.5 bg-pink-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-xl md:text-2xl hover:text-pink-600 transition-colors relative"
              aria-label="Search"
            >
              <IoIosSearch />
            </button>

            {/* User Account */}
            <button
            onClick={() => navigate("/register")}

              className="hidden sm:block text-xl md:text-2xl hover:text-pink-600 transition-colors"
              aria-label="User account"
            >
              <CiUser />
            </button>

            {/* Cart with Badge */}
            <button
              className="relative text-xl md:text-2xl hover:text-pink-600 transition-colors"
              aria-label="Shopping cart"
            >
              <FaOpencart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-linear-to-r from-pink-600 to-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar (Expanded) */}
        {searchOpen && (
          <div className="pb-4 animate-slideDown">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 pr-12 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
                autoFocus
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-600 text-xl">
                <IoIosSearch />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white animate-slideDown">
          <div className="max-h-96 overflow-y-auto py-4 px-4 space-y-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                className={`
                  w-full text-left px-4 py-3 rounded-lg font-medium text-sm
                  transition-colors
                  ${item.highlight
                    ? 'bg-linear-to-r from-pink-50 to-orange-50 text-pink-600 hover:from-pink-100 hover:to-orange-100'
                    : 'hover:bg-gray-50 text-gray-700 hover:text-pink-600'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>
                  {item.hasDropdown && <IoChevronDown className="text-xs" />}
                </div>
              </button>
            ))}
            
            {/* Mobile User Link */}
            <button className="sm:hidden w-full text-left px-4 py-3 rounded-lg font-medium text-sm hover:bg-gray-50 text-gray-700 hover:text-pink-600 transition-colors flex items-center gap-2">
              <CiUser className="text-xl" />
              <span>My Account</span>
            </button>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
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

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;