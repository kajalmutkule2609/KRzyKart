import React from "react";
import "../homeCss/DressStyles.css";
import casualImg from "../assets/casual.jpg";
import  formalImg from "..//assets/fromal.jpg";
import partyImg from "../assets/Party.jpg";
import gymImg from "../assets/gym.jpg";

const dressStyles = [
  { name: "Casual", image: casualImg},
  { name: "Formal", image: formalImg },
  { name: "Party", image: partyImg },
  { name: "Gym", image: gymImg }
];

const DressStyles = () => {
  return (
    <section className="dress-styles1">
      <h2 className="title">BROWSE BY DRESS STYLE</h2>
      <div className="styles-grid1">
        {dressStyles.map((style, index) => (
          <div key={index} className="style-card1">
            <img src={style.image} alt={style.name} />
            <h3 className="style-name1">{style.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DressStyles;
