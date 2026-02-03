import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';


function FloatingItems() {

    const items = [
        {
            title: "K-Derma",
            image: "https://dr.rashel.in/cdn/shop/files/Range-08_jpg.jpg?v=1769677145&width=300",
            link: "/collections/korean-skin-care-products"
        },
        {
            title: "Scrub",
            image: "https://dr.rashel.in/cdn/shop/files/Range-01.jpg?v=1768912604&width=300",
            link: "/collections/face-scrub-for-men-women"
        },
        {
            title: "Nose Strips",
            image: "https://dr.rashel.in/cdn/shop/files/Range-04.jpg?v=1768912764&width=300",
            link: "https://dr.rashel.in/collections/face-serum-for-women-men"
        },
        {
            title: "Serum",
            image: "https://dr.rashel.in/cdn/shop/files/Range-03.jpg?v=1768912734&width=300",
            link: "https://dr.rashel.in/collections/face-serum-for-women-men"
        },
        {
            title: "Face Wash",
            image: "https://dr.rashel.in/cdn/shop/files/Range-02.jpg?v=1768912698&width=300",
            link: "https://dr.rashel.in/collections/sunscreen-for-all-skin-types"
        },
        {
            title: "Sunscreen",
            image: "https://dr.rashel.in/cdn/shop/files/Range-05.jpg?v=1768912775&width=300",
            link: "https://dr.rashel.in/collections/bio-collagen-face-mask"
        },
        {
            title: "Face Mask",
            image: "https://dr.rashel.in/cdn/shop/files/Range-06.jpg?v=1768912849&width=300",
            link: "https://dr.rashel.in/collections/routine-combo"
        },
        {
            title: "Combos",
            image: "https://dr.rashel.in/cdn/shop/files/Range-07_jpg.jpg?v=1769677148&width=300",
            link: "/collections/routine-combo"
        },
        {
            title: "View all",
            image: "https://dr.rashel.in/cdn/shop/files/Range-07_jpg.jpg?v=1769677148&width=300",
            link: "https://dr.rashel.in/collections/best-sellers"
        }
    ]

  return (
    <div className='overflow-x-auto mt-10 px-10'>  
    <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}

 modules={[Autoplay]}
        autoplay={{
          delay: 300,
          disableOnInteraction: false,
        }}
        onReachEnd={(swiper) => {
          swiper.params.autoplay.reverseDirection = true;
        }}
        onReachBeginning={(swiper) => {
          swiper.params.autoplay.reverseDirection = false;
        }}


        className="mySwiper"
      >
        {items.map((item, index) => (
            <SwiperSlide key={index}>
                <div className="container flex flex-col items-center pb-10">
                <div className="imgae w-60 h-60 overflow-hidden">
                    <img src={item.image} alt={item.title} className='w-full h-full hover:scale-105 transition-all duration-300 object-cover object-center '/>
                </div>
                <div className="title mt-5">
                    <p className='text-center text-sm font-semibold'>{item.title}</p>
                </div>
               </div>
            </SwiperSlide>
        ))}
      </Swiper>
      </div>
  ) 
}

export default FloatingItems