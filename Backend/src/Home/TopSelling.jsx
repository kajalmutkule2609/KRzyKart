import React from "react";
import "../homeCss/TopSelling.css";
import stripedShirtImg from "../assets/Strippedshirt.jpg"; // Example images
import graphicTshirtImg from "../assets/shoe.jpg";
import bermudaShortsImg from "../assets/bags.jpg";
import skinnyJeansImg from "../assets/watch.jpg";

const topSelling = [
  { name: "Vertical Striped Shirt", price: "$212", oldPrice: "$232", discount: "-10%", image: stripedShirtImg },
  { name: "Courage Graphic T-shirt", price: "$145", image: graphicTshirtImg },
  { name: "Loose Fit Bermuda Shorts", price: "$80", image: bermudaShortsImg },
  { name: "Faded Skinny Jeans", price: "$210", image: skinnyJeansImg }
];

const TopSelling = () => {
  return (
    <section className="dress-styles">
      <h2>TOP SELLING</h2>
      <div className="styles-grid">
        {topSelling.map((item, index) => (
          <div key={index} className="style-card">
            <img src={item.image} alt={item.name} className="product-image" />
            <h3>{item.name}</h3>
            <p className="price">
              {item.oldPrice && <span className="old-price">{item.oldPrice}</span>}
              {item.price}
            </p>
            {item.discount && <span className="discount">{item.discount}</span>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopSelling;
