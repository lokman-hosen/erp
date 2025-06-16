import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Keyboard } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function SliderCustomItem({ images }: any) {
  

  return (
    <div className="slider-custom-item-wrap" style={{ position: "relative" }}>

      <Swiper
        modules={[Keyboard, Pagination, Navigation]}
        className="mySwiper"
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        speed={500}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
      >
        {images?.map(url => {
          return (
            <SwiperSlide key={url?.id}><img src={url?.url} width={100} height={100} /></SwiperSlide>
          )
        })}

      </Swiper>

    </div>
  );
}
