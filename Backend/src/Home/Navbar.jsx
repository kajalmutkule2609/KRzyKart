import { useState } from "react";
import { FaUser, FaHeart, FaShoppingBag, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../homeCss/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        {/* Main Navbar */}
        <div className="navbar-container">
          {/* Logo */}
          <div className="logo" onClick={() => navigate("/")}><span id="k">KR</span><span id="z">zy</span><span id="kart">Kart</span>.co</div>

          {/* Desktop Menu */}
          <ul className="menu">
            <li>MEN</li>
            <li>WOMEN</li>
            <li>KIDS</li>
            <li>HOME & LIVING</li>
            <li>BEAUTY</li>
          </ul>

          {/* Search Bar */}
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search for products, brands and more" />
          </div>

          {/* Icons with labels */}
          <div className="icons">
            <div className="icon-item" onClick={() => navigate("/login")}>
              <FaUser />
              <span>Login</span>
            </div>
            <div className="icon-item">
              <FaHeart />
              <span>Wishlist</span>
            </div>
            <div className="icon-item" onClick={() => navigate("/cart")}>
              <FaShoppingBag />
              <span>Cart</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
