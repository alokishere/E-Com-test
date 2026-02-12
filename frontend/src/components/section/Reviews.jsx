import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

const reviewsData = [
  {
    id: 1,
    name: "Simar preet kaur",
    rating: 5,
    text: "Really effective for acne-prone skin. It cleanses well, controls oil, and reduces breakouts without making the skin dry.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Manhar bedi",
    rating: 5,
    text: "I have been using this product for six weeks now. Cleared out my acne and old acne marks are lesser too now.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Anjali Saini",
    rating: 4,
    text: "I love the products & packaging also gifted the facial kit to my friend who is now regularly using it. Skin feels hydrated and glowing.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Aditya singh",
    rating: 5,
    text: "Amazing product to use for cuts and burns after shaving. Really soothes the skin and helps with the burning sensation and provides hydration.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
  },
];

const Reviews = () => {
  const swiperRef = useRef(null);

  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header (Leaf Style) */}
        <div className="flex justify-center mb-16">
          <div className=" text-black py-3 px-12 md:px-24 ">
            <h2 className="text-lg md:text-2xl font-bold uppercase tracking-widest text-center">
              REVIEWS
            </h2>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative group px-4">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-12"
          >
            {reviewsData.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="relative aspect-4/5 rounded-3xl overflow-hidden group/card shadow-xl">
                  {/* Background Image */}
                  <img
                    src={review.image}
                    alt={review.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                    {/* Rating & Name */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-[#FFB800] text-sm">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < review.rating
                                ? "text-[#FFDA44]"
                                : "text-gray-400"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                        - {review.name}
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="text-white/90 text-xs md:text-[13px] leading-relaxed line-clamp-4">
                      {review.text}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-20 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-all"
          >
            <FaChevronLeft size={16} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-20 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-all"
          >
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
