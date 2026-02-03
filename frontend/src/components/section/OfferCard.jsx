import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const OfferCard = () => {
  const offers = [
    {
      image:
        "https://dr.rashel.in/cdn/shop/files/Clearance_Sale_Banner-1920x512.jpg?v=1769579823&width=2000",
    },
    {
      image:
        "https://dr.rashel.in/cdn/shop/files/Clearance_Sale_Banner-1920x512.jpg?v=1769579823&width=2000",
    },
    {image:"https://images.unsplash.com/photo-1739980296455-3f8d6051ca20?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {image:"https://images.unsplash.com/photo-1617422275558-e5f616302690?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {image:"https://images.unsplash.com/photo-1723150512429-bfa92988d845?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {image:"https://images.unsplash.com/photo-1617422275558-e5f616302690?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
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
        className="w-full h-96"
      >
        {offers.map((offer, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-96">
              <img src={offer.image} alt="" className="w-full h-full object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OfferCard;
