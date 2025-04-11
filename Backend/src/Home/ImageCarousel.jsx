import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../homeCss/ImageCarousel.css"; // Import the CSS file

const ImageCarousel = () => {
  const images = [
    "src/assets/categoryimg/Imgc1.jpg",
    "src/assets/categoryimg/imgc2.jpg",
    "src/assets/categoryimg/imgc3.jpg",
    "src/assets/categoryimg/imgc4.jpg",
  ];

  return (
    <div className="carousel-container">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Slide ${index + 1}`} className="carousel-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
