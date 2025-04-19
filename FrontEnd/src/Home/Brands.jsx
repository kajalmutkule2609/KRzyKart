import React from "react";
import "../homeCss/brands.css";

const Brands = () => {
  const brandLogos = ["Versace", "Zara", "Gucci", "Prada", "Calvin Klein"];
  return (
    <section className="brands">
      {brandLogos.map((brand, index) => (
        <span key={index}>
          {brand}
        </span>
      ))}
    </section>
  );
};

export default Brands;
