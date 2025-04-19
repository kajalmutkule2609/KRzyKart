import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; 
import "../homeCss/Testimonials.css";

const testimonials = [
  { name: "Sarah M.", 
    review: "I'm blown away by the quality and style of the clothes I received from Shop.co." 
  },
  { name: "Alex K.", review: "Finding clothes that align with my personal style was a challenge until I discovered Shop.co." },
  { name: "James L.", review: "The selection of clothes is diverse and always on point with the latest trends." },
  { name: "Monica R.", review: "Shop.co offers the best customer service and their clothing line is top-notch!" }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="testimonials">
      <h2 className="title">OUR HAPPY CUSTOMERS</h2>
      <div className="testimonials-container">
        <button className="arrow left-arrow" onClick={prevTestimonial}>
          <FaArrowLeft />
        </button>

        <div className="testimonial-card">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="star-icon" />
            ))}
          </div>
          <h3>{testimonials[currentIndex].name}</h3>
          <p>{testimonials[currentIndex].review}</p>
        </div>

        <button className="arrow right-arrow" onClick={nextTestimonial}>
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
