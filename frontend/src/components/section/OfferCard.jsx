import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const OfferCard = () => {
  const offers = [
    {
      image:
        "https://mantraherbal.in/cdn/shop/files/mantra_herbal_gst_reform_homepage_banner_3.jpg?v=1758510895&width=1800",
    },
    {
      image:
        "https://mantraherbal.in/cdn/shop/files/Home_page_desktop.jpg?v=1758186890&width=1800",
    },
    {image:"https://mantraherbal.in/cdn/shop/files/mantra_herbal_gst_reform_homepage_banner_3.jpg?v=1758510895&width=1800"},
    {image:"https://mantraherbal.in/cdn/shop/files/kumkumadi_banner__jpg.jpg?v=1770020540&width=3000"},
    {image:"https://mantraherbal.in/cdn/shop/files/kumkumadi_banner__jpg.jpg?v=1770020540&width=3000"},
    {image:"https://mantraherbal.in/cdn/shop/files/proven_results_banner.jpg?v=1759579819&width=3000"}
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        onReachEnd={(swiper) => {
          swiper.params.autoplay.reverseDirection = true;
        }}
        onReachBeginning={(swiper) => {
          swiper.params.autoplay.reverseDirection = false;
        }}
        className="w-full h-[60vh]"
      >
        {offers.map((offer, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full">
              <img src={offer.image} alt="" className="w-full h-full object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OfferCard;
