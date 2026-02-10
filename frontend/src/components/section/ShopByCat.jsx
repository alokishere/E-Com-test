import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

const skinConcerns = [
  {
    title: "ACNE",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "BLACK HEADS",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "TANNING",
    image:
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "DRY SKIN",
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "WRINKLES",
    image:
      "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "OILY SKIN",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
  },
];

const SkinConcerns = () => {
  const swiperRef = useRef(null);

  return (
    <section className="py-16 bg-white font-sans">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#1D4D6F] text-[#FFFF] py-3 px-12 md:px-24 rounded-tl-[35px] rounded-br-[35px] border-[3px] border-[#A7F3D0] shadow-lg">
            <h2 className="text-lg md:text-2xl font-bold uppercase tracking-widest text-center">
              Shop By Concern
            </h2>
          </div>
        </div>

        {/* Swiper Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 text-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 -ml-6"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FaChevronLeft className="text-xl" />
          </button>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 text-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 -mr-6"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FaChevronRight className="text-xl" />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            loop={true}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="px-4"
          >
            {skinConcerns.map((concern, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center group cursor-pointer">
                  {/* Image Container */}
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-3xl shadow-md transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={concern.image}
                      alt={concern.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm md:text-base font-semibold text-gray-800 text-center tracking-wide uppercase">
                    {concern.title}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default SkinConcerns;