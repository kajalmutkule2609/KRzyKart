import React from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
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
    const route = name.toLowerCase().replace(/[\s&]+/g, "-");
    navigate(`/category/${route}`);
  };

  return (
    <div className="category-bar">
      {categories.map((category, index) => (
        <div
          key={index}
          className="category-item"
          onClick={() => handleCategoryClick(category.name)}
          style={{ cursor: "pointer" }}
        >
          <img src={category.image} alt={category.name} className="category-icon" />
          <span className="category-name">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
