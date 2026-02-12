import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ShoppingCart, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import instance from "../../api/AxiosConfig";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ data }) => {
  const { setCartCount } = useCart();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Actual data from API
  const rating = data.rating || 0;
  const reviewCount = data.reviews_count || 0;
  const discount = data.discountAmount || 0;
  const sellingPrice = data.unitPrice || 0;
  const mrp =
    data.mrp || (discount > 0 ? sellingPrice + discount : sellingPrice);
  const serverBaseUrl = "https://lebrostonebackend.lifeinfotechinstitute.com";

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const addToCartHandler = async (productId) => {
    if (!user) {
      toast.error("Please log in to add products to your cart");
      navigate("/login");
      return;
    }
    try {
      await instance.post("/api/cart/add", {
        userId: user?.id || user?._id,
        productId: productId,
      });
      setCartCount((prev) => prev + 1);
      toast.success("Product added to cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full bg-white rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105"
      style={{
        boxShadow: isHovered
          ? "0 20px 40px rgba(0, 0, 0, 0.1)"
          : "0 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-linear-to-br from-gray-50 to-gray-100">
        {/* Background linear effect */}
        <div className="absolute inset-0 bg-linear-to-br from-white/50 via-transparent to-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Product Image */}
        <img
          src={`https://lebrostonebackend.lifeinfotechinstitute.com${data?.thumbnail}`}
          alt={data.name}
          className="w-full h-full object-contain p-6 sm:p-8 transition-transform duration-500 group-hover:scale-115"
        />

        {/* Category Badge */}
        {data.category && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-700 bg-cyan-100 rounded-full border border-cyan-200 shadow-sm">
              {data.category.name || "Product"}
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-4 right-4">
            <div className="flex flex-col items-center justify-center w-14 h-14 bg-linear-to-br from-red-500 to-red-600 rounded-full shadow-lg text-white">
              <span className="text-xs font-bold">SAVE</span>
              <span className="text-lg font-black">{discount}%</span>
            </div>
          </div>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={() => navigate(`/product/${data._id}`)}
            className="px-6 py-3 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform -translate-y-4 group-hover:translate-y-0"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col h-auto p-5 sm:p-6">
        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 mb-2 leading-tight">
          {data.name}
        </h3>

        {/* Description */}
        <div
          className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-4 grow"
          dangerouslySetInnerHTML={{
            __html:
              data.tagline || data.short_description || data.description || "",
          }}
        />

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-gray-900">{rating}</span>
          </div>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>

        {/* Pricing Section */}
        <div className="mb-4 pb-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">
              ₹{sellingPrice}
            </span>
            {mrp > sellingPrice && (
              <>
                <span className="text-sm sm:text-base text-gray-400 line-through">
                  ₹{mrp}
                </span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {discount}% off
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-gray-500">Inclusive of all taxes</p>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`w-2 h-2 rounded-full ${data.currentStockQty > 0 ? "bg-green-500" : "bg-red-500"}`}
          ></div>
          <span
            className={`text-xs font-semibold ${data.currentStockQty > 0 ? "text-green-700" : "text-red-700"}`}
          >
            {data.currentStockQty > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <button
            onClick={() => navigate(`/product/${data._id}`)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition-all active:scale-95 text-sm"
          >
            <span>Details</span>
          </button>
          <button
            onClick={() => addToCartHandler(data._id)}
            className="flex items-center justify-center px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
          </button>
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-bl-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-linear-to-tr from-gray-200/20 to-transparent rounded-tr-2xl pointer-events-none"></div>

      <style>{`
        @keyframes shimmer {
          0%, 100% {
            background-position: -1000px 0;
          }
          50% {
            background-position: 1000px 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
