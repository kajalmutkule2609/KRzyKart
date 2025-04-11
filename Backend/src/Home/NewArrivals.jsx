import React from "react";
import "../homeCss/NewArrivals.css";
import tshirtImg from "../assets/T-shirt.jpg"; 
import jeansImg from "../assets/jeans.jpg";
import shirtImg from "../assets/CheckShirtjpg.jpg";
import stripedTshirtImg from "../assets/strippedshirt.jpg";

const newArrivals = [
  { name: "T-shirt with Tape Details", price: "$120", image: tshirtImg },
  { name: "Skinny Fit Jeans", price: "$240", oldPrice: "$260", discount: "-20%", image: jeansImg },
  { name: "Checkered Shirt", price: "$180", image: shirtImg },
  { name: "Sleeve Striped T-shirt", price: "$130", oldPrice: "$160", discount: "-30%", image: stripedTshirtImg }
];

const NewArrivals = () => {
  return (
    <section className="new-arrivals">
      <h2>NEW ARRIVALS</h2>
      <div className="arrivals-grid">
        {newArrivals.map((item, index) => (
          <div key={index} className="item">
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

export default NewArrivals;
