import React, { useState, useEffect } from "react";
import { FaUser, FaHeart, FaShoppingBag, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../homeCss/Navbar.css";

export default function Navbar() {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));
  const navigate = useNavigate();
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, [window.location.href]);

  const handleLogout = () => {
    localStorage.clear();
    setUserData(null);
    setShowAccountInfo(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={() => navigate("/")}><span id="k">KR</span><span id="z">zy</span><span id="kart">Kart</span>.co</div>
        <ul className="menu">
          <li onClick={() => navigate("/category/kilos")}>PRODUCTS</li>
          <li>MEN</li>
          <li>WOMEN</li>
          <li>KIDS</li>
          <li>HOME & LIVING</li>
          <li>BEAUTY</li>
        </ul>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search for products, brands and more" />
        </div>
        <div className="icons">
          {userData ? (
            userData.role === 'seller' ? (
              <div className="icon-item" onClick={() => navigate("/seller-dashboard")}>
                <FaUser />
                <span>Seller Dashboard</span>
              </div>
            ) : (
              <div className="icon-item" onClick={() => setShowAccountInfo(!showAccountInfo)}>
                <FaUser />
                <span>Account</span>
                {showAccountInfo && (
                  <div className="account-info">
                    <h1>Account Information</h1>
                    <p><span className="sp">Name:</span> {userData.fullName}</p>
                    <p><span className="sp">Email:</span> {userData.email}</p>
                    <p><span className="sp">Contact:</span> {userData.contactNo}</p>
                    <p><span className="sp">Address:</span> {userData.address}</p>
                    {/* <button onClick={handleLogout}>Logout</button> */}
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="icon-item" onClick={() => navigate("/login")}>
              <FaUser />
              <span>Login</span>
            </div>
          )}
          <div className="icon-item" onClick={() => navigate("/wishlist")}>
            <FaHeart />
            <span>Wishlist</span>
          </div>
          <div className="icon-item" onClick={() => navigate("/cart")}>
            <FaShoppingBag />
            <span>Cart</span>
          </div>
          <div>
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}


