import React from "react";
import { useNavigate } from "react-router-dom";
import "../homeCss/TopSelling.css";
import stripedShirtImg from "../assets/Strippedshirt.jpg";
import shoes from "../assets/heels.webp";
import bermudaShortsImg from "../assets/bags.jpg";
import skinnyJeansImg from "../assets/wt.jpg";

const topSelling = [
  { name: "Vertical Striped Shirt", price: "$212", oldPrice: "$232", discount: "-10%", image: stripedShirtImg },
  { name: "Courage Graphic T-shirt", price: "$145", image: shoes },
  { name: "Loose Fit Bermuda Shorts", price: "$80", image: bermudaShortsImg },
  { name: "Faded Skinny Jeans", price: "$210", image: skinnyJeansImg }
];

const TopSelling = () => {
  const navigate = useNavigate();

  const handleItemClick = (name) => {
    const slug = name
      .toLowerCase()
      .replace(/[\s&]+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    navigate(`/display-products/${slug}`);
  };

  return (
    <section className="dress-styles">
      <h2>TOP SELLING</h2>
      <div className="styles-grid">
        {topSelling.map((item, index) => (
          <div
            key={index}
            className="style-card"
            onClick={() => handleItemClick(item.name)}
            style={{ cursor: "pointer" }}
          >
            <img src={item.image} alt={item.name} className="product-images" />
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
