// ... keep imports ...
import React, { useState, useRef } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TopPicks = () => {
  const [activeTab, setActiveTab] = useState("BESTSELLERS");
  const swiperRef = useRef(null);

  const categories = ["BESTSELLERS", "NEW ARRIVAL", "COMBOS"];

  const allProducts = [
    {
      id: 1,
      title: "Lebrostone Shilajit", // Updated title to match image for demo
      price: 229,
      originalPrice: 349,
      discount: "20% OFF",
      rating: 5,
      reviews: 88,
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
      badge: "NEW LAUNCH",
      category: "BESTSELLERS",
      action: "ADD TO CART",
    },
    {
      id: 2,
      title: "Lebrostone Jamun Powder",
      price: 299,
      originalPrice: 399,
      discount: "20% OFF",
      rating: 5,
      reviews: 93,
      image:
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1000&auto=format&fit=crop",
      badge: "NEW LAUNCH",
      category: "BESTSELLERS",
      action: "ADD TO CART",
    },
    {
      id: 3,
      title: "Lebrostone Face Pack Soap",
      price: 299,
      originalPrice: 399,
      isStartingPrice: true,
      discount: "20% OFF",
      rating: 5,
      reviews: 93,
      image:
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000&auto=format&fit=crop",
      badge: "NEW LAUNCH",
      category: "BESTSELLERS",
      action: "ADD TO CART",
    }
  ];

  const filteredProducts = allProducts.filter((p) => p.category === activeTab);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto relative bg-white">
      {/* Header */}
      <div className="flex justify-center mb-16">
        <div className="bg-[#1D4D6F] text-white py-3 px-12 md:px-24 rounded-tl-[35px] rounded-br-[35px] border-[3px] border-[#A7F3D0] shadow-lg">
          <h2 className="text-lg md:text-2xl font-bold uppercase tracking-widest text-center">
            Top Picks This Season
          </h2>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex w-fit mx-auto items-center justify-center mb-16 bg-[#D2B48C] rounded-full p-1.5 shadow-sm">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-8 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
              activeTab === category
                ? "bg-white text-black shadow-md"
                : "text-black hover:bg-white/30"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Slider Container */}
      <div className="relative group px-4 overflow-x-auto scrollbar-hide">
       
          <div className="h-full relative flex flex-nowrap justify-between gap-4 pt-10">
             {filteredProducts.map((product) => (
              <div key={product.id} className="">
            {/* Floating Image - Top Left */}
            <div className="relative  flex items-center justify-center w-90">
              <div className="absolute -top-12 -left-12 w-[180px] aspect-square rounded-xl p-1 bg-white shadow-xl overflow-hidden z-10 transition-transform duration-200 ">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-200"
                />
              </div>
              {/* Main Card Background */}
              <div className="bg-[#ffffff] rounded-xl p-2 pl-[42%] pt-10 pb-10 h-72 w-90 shadow-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between border border-gray-100">
                {/* Content Right Side */}
                <div className="flex flex-col items-start gap-3 h-full w-full">
                  {/* Badge */}
                  <div className="mb-2">
                    <span className="bg-[#FF3F6C] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                      {product.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-gray-900 font-bold text-xl leading-snug line-clamp-2">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-[#FFB800] text-base">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm font-medium">
                      ({product.reviews} Reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-gray-400 line-through text-lg font-medium">
                      ₹{product.originalPrice}
                    </span>
                    <span className="text-3xl font-extrabold text-[#111]">
                      ₹{product.price}
                    </span>
                  </div>

                  {/* Button */}
                  <button className="w-40 bg-[#00A859] hover:bg-[#008f4c] text-white py-3.5 rounded-full font-bold text-sm tracking-wide shadow-md transition-all transform hover:scale-[1.02] mt-auto">
                    {product.action}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
          </div>

        {/* Navigation Arrows */}
        {/* <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-0 top-[50%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex border border-gray-100"
        >
          <FaChevronLeft size={18} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-0 top-[50%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex border border-gray-100"
        >
          <FaChevronRight size={18} />
        </button> */}
      </div>
    </section>
  );
};

export default TopPicks;
