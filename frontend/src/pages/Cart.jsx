import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/section/Footer";
import instance from "../api/AxiosConfig";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [user?.id]);

  const fetchCart = () => {
    instance
      .get(`/cart?userId=${user.id}`)
      .then((response) => {
        setCartItems(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        setLoading(false);
      });
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    instance
      .patch(`/cart/${id}`, { quantity: newQty })
      .then(() => fetchCart());
  };

  const removeItem = (id) => {
    instance.delete(`/cart/${id}`).then(() => fetchCart());
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0,
  );

  if (loading)
    return <div className="p-10 text-center">Loading your cart...</div>;

  return (
    <div className="bg-[#FAF6EA] min-h-screen flex flex-col">
      <Navbar />

      <main className="grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black text-gray-900 mb-10">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Seems like you haven't added anything yet.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-50 transition-all hover:shadow-md"
                >
                  <div className="w-32 h-32 shrink-0 bg-gray-50 rounded-xl overflow-hidden mb-4 sm:mb-0 mr-0 sm:mr-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="grow text-center sm:text-left">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-indigo-600 font-bold mb-4">
                      ${item.price}
                    </p>

                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 font-bold text-gray-800 bg-white border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6 text-right">
                    <p className="text-xl font-black text-gray-900">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-black text-indigo-600">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert("Checkout functionality coming soon!")}
                  className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-200 active:scale-95"
                >
                  Proceed to Checkout
                </button>

                <p className="mt-6 text-center text-xs text-gray-400">
                  Secure Checkout Guaranteed
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
