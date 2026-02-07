import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

const TopPicks = () => {
  const [activeTab, setActiveTab] = useState("BESTSELLERS");
  const swiperRef = useRef(null);

  const categories = ["BESTSELLERS", "NEW ARRIVAL", "COMBOS"];

  const allProducts = [
    {
      id: 1,
      title: "Soundaryam Kumkumadi Serum Saffron & Wheat Germ Oil",
      price: 1836,
      originalPrice: 2295,
      discount: "20% OFF",
      rating: 5,
      reviews: 2,
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
      badge: "CERTIFICATE OF PURITY",
      category: "BESTSELLERS",
      action: "ADD TO CART",
    },
    {
      id: 2,
      title: "Hair Growth Tonic Rosemary & Aloevera",
      price: 719,
      originalPrice: 899,
      discount: "20% OFF",
      rating: 5,
      reviews: 23,
      image:
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1000&auto=format&fit=crop",
      badge: "AYURVEDIC FORMULA",
      category: "BESTSELLERS",
      action: "ADD TO CART",
    },
    {
      id: 3,
      title: "Gold And Saffron Glowing Face Gel With 24 Carat Gold",
      price: 1999,
      originalPrice: 2499,
      isStartingPrice: true,
      discount: "20% OFF",
      rating: 5,
      reviews: 42,
      image:
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000&auto=format&fit=crop",
      category: "BESTSELLERS",
      action: "CHOOSE OPTION",
    },
    {
      id: 4,
      title: "Gulab Arka Indian Rose Water",
      price: 319,
      originalPrice: 399,
      isStartingPrice: true,
      discount: "20% OFF",
      rating: 5,
      reviews: 42,
      image:
        "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=1000&auto=format&fit=crop",
      category: "BESTSELLERS",
      action: "CHOOSE OPTION",
    },
    // Add more for other categories to demonstrate filtering
    {
      id: 5,
      title: "Radiance Face Wash with Vitamin C",
      price: 499,
      originalPrice: 599,
      discount: "15% OFF",
      rating: 4,
      reviews: 15,
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop",
      category: "NEW ARRIVAL",
      action: "ADD TO CART",
    },
  ];

  const filteredProducts = allProducts.filter((p) => p.category === activeTab);

  return (
    <section className="py-16 px-2 max-w-7xl mx-auto relative overflow-hidden bg-white">
      {/* Header */}
      <div className="flex justify-center mb-10">
        <div className="bg-[#1D4D6F] text-[#FFFF] py-3 px-12 md:px-24 rounded-tl-[35px] rounded-br-[35px] border-[3px] border-[#A7F3D0] shadow-lg">
          <h2 className="text-lg md:text-2xl font-bold uppercase tracking-widest text-center">
            Top Picks This Season
          </h2>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex w-fit mx-auto items-center justify-center mb-10 bg-[#D2B48C] rounded-full p-1.5 shadow-sm">
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
      <div className="relative group">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="flex flex-col h-full hover-card-animation">
                {/* Image Container */}
                <div className="relative aspect-square mb-4 overflow-hidden bg-gray-50 rounded-lg group/img">
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-0 z-10 bg-black text-white text-[10px] font-bold px-3 py-1.5">
                    {product.discount}
                  </div>

                  {/* Certification Badge (Simulated) */}
                  {product.id % 2 === 1 && (
                    <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/20 flex items-center justify-center p-1 backdrop-blur-sm">
                      <div className="w-full h-full rounded-full border border-dashed border-[#B8860B]/40 flex items-center justify-center text-[6px] text-[#B8860B] font-bold text-center leading-none uppercase">
                        Cert of Purity
                      </div>
                    </div>
                  )}
                  {product.id % 2 === 0 && (
                    <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#4A5D23]/10 border border-[#4A5D23]/20 flex items-center justify-center p-2 backdrop-blur-sm">
                      <div className="w-full h-full rounded-full border border-[#4A5D23]/40 flex items-center justify-center">
                        <div className="w-1.5 h-3 border-r-2 border-b-2 border-[#4A5D23] rotate-45 transform -translate-y-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover/img:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col grow">
                  <h3 className="text-xs md:text-[13px] font-medium leading-tight text-gray-800 mb-2 min-h-[40px]">
                    {product.title}
                  </h3>

                  {/* Pricing */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-gray-400 line-through text-xs">
                      ₹ {product.originalPrice}
                    </span>
                    <span className="text-black font-bold text-sm">
                      {product.isStartingPrice && (
                        <span className="text-[10px] font-medium mr-1 uppercase">
                          From
                        </span>
                      )}
                      ₹ {product.price}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex text-[#FFB800] text-[10px]">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <span className="text-[11px] text-gray-500">
                      {product.reviews} review
                    </span>
                  </div>

                  {/* Action Button */}
                  <button className="mt-auto w-full py-2.5 border border-black text-black text-[11px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-300">
                    {product.action}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
        >
          <FaChevronLeft size={16} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
        >
          <FaChevronRight size={16} />
        </button>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                .hover-card-animation {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .hover-card-animation:hover {
                    transform: translateY(-5px);
                }
            `,
        }}
      />
    </section>
  );
};

export default TopPicks;
