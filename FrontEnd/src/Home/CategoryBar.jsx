import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../homeCss/CategoryBar.css";

const categories = [
  { name: "Kilos", image: "src/assets/categoryimg/beauty.png" },
  { name: "Mobiles", image: "src/assets/categoryimg/mobile.png" },
  { name: "Fashion", image: "src/assets/categoryimg/fashion.png" },
  { name: "Electronics", image: "src/assets/categoryimg/electronics.png" },
  { name: "Home & Furniture", image: "src/assets/categoryimg/Furniture.png" },
  { name: "Appliances", image: "src/assets/categoryimg/appliences.png" },
  { name: "Grocery", image: "src/assets/categoryimg/mobile.png" },
  { name: "Beauty", image: "src/assets/categoryimg/beauty.png" },
  { name: "Toys & More", image: "src/assets/categoryimg/appliences.png" }
];

const CategoryBar = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    // turn "Home & Furniture" → "home-furniture", "Mobiles" → "mobiles", etc.
    const slug = name
      .toLowerCase()
      .replace(/[\s&]+/g, "-")   
      .replace(/[^a-z0-9\-]/g, ""); 

    navigate(`/display-products/${slug}`);
  };

  return (
    <div className="category-bar">
      {categories.map((category, idx) => (
        <div
          key={idx}
          className="category-item"
          onClick={() => handleCategoryClick(category.name)}
        >
          <img
            src={category.image}
            alt={category.name}
            className="category-icon"
          />
          <span className="category-name">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
