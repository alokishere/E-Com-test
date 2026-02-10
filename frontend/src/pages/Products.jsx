import React, { useEffect, useState } from "react";
import ProductCard from "../components/cards/ProductCard";
import { toast } from "react-toastify";
import instance from "../api/AxiosConfig";
import { ChevronRight, Sparkles } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    instance
      .get("/api/product/getallproducts")
      .then((response) => {
        setProducts(response.data.products);
        groupProductsByCategory(response.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Error fetching products");
        setLoading(false);
      });
  }, []);

  const groupProductsByCategory = (productList) => {
    const grouped = productList.reduce((acc, product) => {
      const category = product.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
    setGroupedProducts(grouped);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  const categories = Object.keys(groupedProducts).sort();

  return (
    <div className="min-h-screen bg-linear-to-b ">
      {/* Hero Section */}
      <h1 className="text-center text-4xl font-bold mt-12 mb-8">Our Products</h1>
      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg font-medium">No products available</p>
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((category, idx) => (
              <div key={category} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                {/* Category Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-linear-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                      <h2 className="text-3xl font-black text-gray-900">{category}</h2>
                      <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-bold">
                        {groupedProducts[category].length} items
                      </span>
                    </div>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 text-cyan-600 hover:text-cyan-700 font-semibold hover:bg-cyan-50 rounded-lg transition-all"
                    >
                      View All
                      <ChevronRight className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm ml-4">
                    Explore our {category.toLowerCase()} collection
                  </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-4">
                  {groupedProducts[category].map((product, pidx) => (
                    <div
                      key={product._id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${idx * 100 + pidx * 50}ms` }}
                    >
                      <ProductCard data={product} />
                    </div>
                  ))}
                </div>

                {/* Category Divider */}
                {idx < categories.length - 1 && (
                  <div className="my-8 flex items-center gap-4">
                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
                    <span className="text-gray-500 text-sm font-medium">Next Collection</span>
                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      {products.length > 0 && (
        <div className="bg-linear-to-r from-cyan-50 to-blue-50 border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-black text-gray-900 mb-3">
              Total {products.length} Products Available
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Find exactly what you're looking for across {categories.length} categories
            </p>
            <button className="px-8 py-3 bg-linear-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-shadow">
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Products;