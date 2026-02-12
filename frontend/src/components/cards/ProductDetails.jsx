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
  const [mainImage, setMainImage] = useState("");

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
        const res = await instance.get(`/api/products/${_id}`);
        const productData = res.data.data;
        setData(productData);
        const serverBaseUrl =
          "https://lebrostonebackend.lifeinfotechinstitute.com";
        if (productData?.images?.length > 0) {
          setMainImage(`${serverBaseUrl}${productData.images[0]}`);
        } else if (productData?.thumbnail) {
          setMainImage(`${serverBaseUrl}${productData.thumbnail}`);
        }
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

  const discount = data.discountAmount || 0;
  const sellingPrice = data.unitPrice || 0;
  const originalPrice =
    data.mrp || (discount > 0 ? sellingPrice + discount : sellingPrice);
  const serverBaseUrl = "https://lebrostonebackend.lifeinfotechinstitute.com";

  // Use variants from data if available, or fall back to a default based on net_content
  const sizeOptions =
    data.variants && data.variants.length > 0
      ? data.variants.map((v) => ({
          label: v.size,
          price: v.selling_price,
          mrp: v.mrp,
          discount: v.discount,
          perml: Math.round(v.selling_price / (parseInt(v.size) || 1)),
        }))
      : [
          {
            label: data.net_content || "Standard",
            price: sellingPrice,
            mrp: originalPrice,
            discount: discount,
            perml: Math.round(sellingPrice / (parseInt(data.net_content) || 1)),
          },
        ];

  const packOptions = [
    // You could generate these dynamically or keep a few presets
    {
      label: `${data.net_content || "Standard"} (Pack of 2)`,
      price: Math.round(sellingPrice * 1.8),
      mrp: originalPrice * 2,
      discount: Math.round(
        ((originalPrice * 2 - sellingPrice * 1.8) / (originalPrice * 2)) * 100,
      ),
      perml: Math.round(
        (sellingPrice * 1.8) / (parseInt(data.net_content) * 2 || 2),
      ),
    },
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
            {data.category?.name || "Products"}
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">{data.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center aspect-square mb-4 border border-gray-300">
              <img
                src={mainImage}
                alt={data.name}
                className="w-full h-full object-contain p-8"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {data.images?.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(`${serverBaseUrl}${img}`)}
                  className={`w-16 h-16 bg-gray-100 rounded border shrink-0 cursor-pointer overflow-hidden ${mainImage === `${serverBaseUrl}${img}` ? "border-cyan-500 border-2" : "border-gray-300 hover:border-cyan-500"}`}
                >
                  <img
                    src={`${serverBaseUrl}${img}`}
                    alt={`View ${i}`}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Middle Column - Details */}
          <div className="lg:col-span-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {data.name}
            </h1>

            {/* Subtitle */}
            <p className="text-gray-700 text-sm font-medium mb-4">
              {data.tagline}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-gray-900">
                  {data.rating || 0}
                </span>
              </div>
              <a href="#" className="text-cyan-500 text-sm font-medium">
                {data.reviews_count || 0} Reviews
              </a>
            </div>

            {/* Net Content */}
            <div className="mb-6 pb-6 border-b border-gray-300">
              <p className="text-gray-700">
                Net content: <span className="font-bold">{data.unit}</span>
              </p>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{sellingPrice}
                </span>
                {discount > 0 && (
                  <span className="text-2xl text-red-600 font-bold">
                    {discount}% off
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm">
                M.R.P. <span className="line-through">₹{originalPrice}</span>{" "}
                Inclusive of all taxes
              </p>
            </div>

            {/* Size Selection */}
            {sizeOptions.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Select Size</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                      <div className="font-bold text-gray-900 text-sm">
                        {size.label}
                      </div>
                      <div className="text-gray-900 font-bold text-sm mt-1">
                        ₹{size.price}
                      </div>
                      <div className="flex gap-1 text-xs mt-1">
                        {size.mrp > size.price && (
                          <span className="line-through text-gray-500">
                            ₹{size.mrp}
                          </span>
                        )}
                        <span className="text-green-600 font-bold">
                          {size.discount}% off
                        </span>
                      </div>
                      <div className="text-green-600 text-xs font-bold mt-2">
                        In stock
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description Section */}
            <div className="mb-8 pb-8 border-b border-gray-300">
              <h3 className="font-bold text-gray-900 mb-2">Description</h3>
              <div
                className="text-gray-600 text-sm leading-relaxed product-description"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>

            {/* Features */}
            {data.features && data.features.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Key Features</h3>
                <div className="space-y-3">
                  {data.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-5 h-5 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center shrink-0">
                        ✓
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {feature.title}
                        </p>
                        <p className="text-xs text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {data.faqs && data.faqs.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">FAQs</h3>
                <div className="space-y-4">
                  {data.faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-3">
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        Q: {faq.question}
                      </p>
                      <p className="text-sm text-gray-600">A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                  <p className="text-xs text-gray-600 font-medium">
                    {badge.label}
                  </p>
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

              {/* Main Offer */}
              <div className="mb-4 pb-4 border-b border-gray-300">
                <p className="text-sm font-bold text-gray-900">
                  Limited Time Offer
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Get special discounts on your first order!
                </p>
              </div>

              {/* Current Price Card */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-bold text-gray-900 text-xl">
                    ₹{sellingPrice}
                  </span>
                  {discount > 0 && (
                    <span className="text-red-600 font-bold text-lg">
                      {discount}% off
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  Inclusive of all Taxes
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold text-gray-900">
                    {data.rating || 0}
                  </span>
                  <span className="text-xs text-gray-600">
                    •{" "}
                    <span className="text-cyan-500">
                      {data.reviews_count || 0} Reviews
                    </span>
                  </span>
                </div>

                <p className="text-xs text-gray-700 font-medium">{data.unit}</p>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6 mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Quantity :
                </p>
                <div className="flex items-center justify-start gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 text-gray-700 font-bold"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold text-gray-900 w-6 text-center">
                    {quantity}
                  </span>
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
      <ProductDetailsBottom data={data} />
      <Footer />
    </div>
  );
};

export default ProductDetails;
