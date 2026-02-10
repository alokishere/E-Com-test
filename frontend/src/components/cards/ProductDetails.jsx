import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../api/AxiosConfig";
import { toast } from "react-toastify";
import { Star, ChevronRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import ProductDetailsBottom from "./ProductDetailsBottom";
import Footer from "../section/Footer";

const ProductDetails = () => {
  const { setCartCount } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("200ml");
 const { _id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 safe user parse
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  // 🔹 fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await instance.get(
          `/api/product/getproductbyid/${_id}`
        );
        setData(res.data.product);
        // console.log(res.data.product);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [_id]);

  // 🔹 add to cart (CORRECT)
  const addToCartHandler = async () => {
    try {
      await instance.post("/api/cart/add", {
        userId: user.id,
        productId: data._id,
      });
setCartCount((prev) => prev + 1);
      toast.success("Product added to cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart");
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }
 if (!data) return <p>Product not found</p>;

  const discount = 30;
  const originalPrice = 549;

  const sizeOptions = [
    { label: "100 ml", price: 269, mrp: 399, discount: 32, perml: 269 },
    { label: "150 ml", price: 314, mrp: 449, discount: 30, perml: 209 },
    { label: "200 ml", price: 384, mrp: 549, discount: 30, perml: 192 },
  ];

  const packOptions = [
    { label: "100 ml (Pack of 2)", price: 404, mrp: 538, discount: 25, perml: 202 },
    { label: "150 ml (Pack of 2)", price: 503, mrp: 838, discount: 40, perml: 168, timer: "12h : 37m : 42s" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <a href="/" className="text-cyan-500 hover:text-cyan-600">
            Home
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <a href="/products" className="text-cyan-500 hover:text-cyan-600">
            Face-Wash
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">{data.title} – 200 ml</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center aspect-square mb-4 border border-gray-300">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-contain p-8"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 bg-gray-100 rounded border border-gray-300 shrink-0 cursor-pointer hover:border-cyan-500"
                >
                  <img
                    src={data.image}
                    alt={`View ${i}`}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Middle Column - Details */}
          <div className="lg:col-span-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{data.title}</h1>

            {/* Subtitle */}
            <p className="text-gray-700 text-sm font-medium mb-4">
              Removes Tan | Brightens Skin
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-gray-900">4.9</span>
              </div>
              <a href="#" className="text-cyan-500 text-sm font-medium">
                185 Reviews
              </a>
            </div>

            {/* Net Content */}
            <div className="mb-6 pb-6 border-b border-gray-300">
              <p className="text-gray-700">
                Net content: <span className="font-bold">200ml</span> (USP: <span className="font-bold">₹1.92/ml</span>)
              </p>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">₹{data.price}</span>
                <span className="text-2xl text-red-600 font-bold">{discount}% off</span>
              </div>
              <p className="text-gray-600 text-sm">
                M.R.P. <span className="line-through">₹{originalPrice}</span> Inclusive of all taxes
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Select Size</h3>
              <div className="grid grid-cols-3 gap-3">
                {sizeOptions.map((size, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(size.label)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      selectedSize === size.label
                        ? "border-cyan-500 bg-cyan-50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    <div className="font-bold text-gray-900 text-sm">{size.label}</div>
                    <div className="text-gray-900 font-bold text-sm mt-1">₹{size.price}</div>
                    <div className="flex gap-1 text-xs mt-1">
                      <span className="line-through text-gray-500">₹{size.mrp}</span>
                      <span className="text-green-600 font-bold">{size.discount}% off</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">(₹{size.perml}/ml)</div>
                    <div className="text-green-600 text-xs font-bold mt-2">In stock</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pack Options */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Pack Options</h3>
              <div className="grid grid-cols-2 gap-3">
                {packOptions.map((pack, idx) => (
                  <button
                    key={idx}
                    className="p-3 rounded-lg border-2 border-gray-300 bg-white text-left hover:border-gray-400 transition-all"
                  >
                    <div className="font-bold text-gray-900 text-sm">{pack.label}</div>
                    <div className="text-gray-900 font-bold text-sm mt-1">₹{pack.price}</div>
                    <div className="flex gap-1 text-xs mt-1">
                      <span className="line-through text-gray-500">₹{pack.mrp}</span>
                      <span className="text-green-600 font-bold">{pack.discount}% off</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">(₹{pack.perml}/ml)</div>
                    {pack.timer && (
                      <div className="text-purple-600 text-xs font-semibold mt-2">
                        Sale: {pack.timer}
                      </div>
                    )}
                    {!pack.timer && (
                      <div className="text-green-600 text-xs font-bold mt-2">In stock</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-4 gap-4 py-6 border-t border-gray-300">
              {[
                { icon: "✓", label: "Cruelty Free", color: "green" },
                { icon: "🌿", label: "Best Of Nature", color: "green" },
                { icon: "✓", label: "No Toxins", color: "green" },
                { icon: "🌱", label: "Plastic Positive", color: "green" },
              ].map((badge, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-10 h-10 rounded-full border-2 border-green-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-sm text-green-600">{badge.icon}</span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{badge.label}</p>
                </div>
              ))}
            
            </div>
         
          </div>

          {/* Right Column - Offers Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 sticky top-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-lg">⭐</span> Available Offers
              </h3>

              {/* Offer Pills */}
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              {/* Main Offer */}
              <div className="mb-4 pb-4 border-b border-gray-300">
                <p className="text-sm font-bold text-gray-900">Buy 3 Pay For 2</p>
                <p className="text-xs text-gray-600 mt-1">Use code B3P2</p>
              </div>

              {/* Current Price Card */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-bold text-gray-900">₹{data.price}</span>
                  <span className="text-red-600 font-bold text-lg">{discount}% off</span>
                </div>
                <p className="text-xs text-gray-600 mb-3">Inclusive of all Taxes</p>

                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold text-gray-900">4.9</span>
                  <span className="text-xs text-gray-600">
                    • <span className="text-cyan-500">185 Reviews</span>
                  </span>
                </div>

                <p className="text-xs text-gray-700 font-medium">200 ml</p>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6 mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Quantity :</p>
                <div className="flex items-center justify-start gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 text-gray-700 font-bold"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold text-gray-900 w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 text-gray-700 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={addToCartHandler}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-xl">🛒</span>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
     <ProductDetailsBottom/>
    <Footer/>
    </div>
  );
};

export default ProductDetails;