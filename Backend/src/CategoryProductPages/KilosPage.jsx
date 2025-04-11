import React from "react";
import "../CategoryProductPages/KilosPage.css"; 

const kiloProducts = [
  {
    id: 1,
    name: "Basmati Rice (5kg)",
    image: "../src/assets/KilosProductImg/BasmatiRice.jpg",
    price: 450,
    quantity: "5 kg"
  },
  {
    id: 2,
    name: "Wheat Flour (10kg)",
    image: "../src/assets/KilosProductImg/wheat.jpg",
    price: 350,
    quantity: "10 kg"
  },
  {
    id: 3,
    name: "Sugar (2kg)",
    image: "../src/assets/KilosProductImg/Suagar.jpg",
    price: 90,
    quantity: "2 kg"
  },
  {
    id: 4,
    name: "Toor Dal (1kg)",
    image: "../src/assets/KilosProductImg/BasmatiRice.jpg",
    price: 150,
    quantity: "1 kg"
  },
  {
    id: 5,
    name: "Toor Dal (1kg)",
    image: "../src/assets/KilosProductImg/ToorDal.jpeg",
    price: 150,
    quantity: "1 kg"
  },
  {
    id: 6,
    name: "Toor Dal (1kg)",
    image: "../src/assets/KilosProductImg/Suagar.jpg",
    price: 150,
    quantity: "1 kg"
  },
  {
    id: 7,
    name: "Toor Dal (1kg)",
    image: "../src/assets/KilosProductImg/ToorDal.jpeg",
    price: 150,
    quantity: "1 kg"
  },
  {
    id: 8,
    name: "Toor Dal (1kg)",
    image: "../src/assets/KilosProductImg/wheat.jpg",
    price: 150,
    quantity: "1 kg"
  },
  {
    id: 9,
    name: "Toor Dal (1kg)",
    image: "../src/assets/KilosProductImg/BasmatiRice.jpg",
    price: 150,
    quantity: "1 kg"
  },
  {
    id: 10,
    name: "Toor Dal (1kg)",
    image: "../src/assets/KilosProductImg/ToorDal.jpeg",
    price: 150,
    quantity: "1 kg"
  }
  ,
  {
    id: 11,
    name: "Wheat Flour (10kg)",
    image: "../src/assets/KilosProductImg/wheat.jpg",
    price: 350,
    quantity: "10 kg"
  },
  {
    id: 12,
    name: "Sugar (2kg)",
    image: "../src/assets/KilosProductImg/BasmatiRice.jpg",
    price: 90,
    quantity: "2 kg"
  }
];

const KilosPage = () => {
  return (
    <div className="kilos-container">
      <h2 className="kilos-title">Kilos Category</h2>
      <div className="kilos-grid">
        {kiloProducts.map((product) => (
          <div key={product.id} className="kilos-card">
            <img src={product.image} alt={product.name} className="kilos-image" />
            <div className="kilos-details">
              <h4>{product.name}</h4>
              <p>Price: ₹{product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KilosPage;
