import React, { useState, useEffect } from "react";
import { FaUser, FaHeart, FaShoppingBag, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../homeCss/Navbar.css";

export default function Navbar() {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || {});
    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [showAccountInfo, setShowAccountInfo] = useState(false);

    useEffect(() => {
        const handleStorageChange = () => {
            setUserData(JSON.parse(localStorage.getItem("userData")) || {});
            setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("userData")) || {});
        setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
    }, [window.location.href]);

    const handleLogout = () => {
        localStorage.clear();
        setUserData({});
        setIsLoggedIn(false);
        setShowAccountInfo(false);
        navigate("/login");
    };

    const handleSearch = () => {
        if (!searchTerm.trim()) return;

        if (["men", "women", "kids", "beauty", "home", "electronics", "fashion", "clothing"].includes(searchTerm.toLowerCase())) {
            navigate(`/productByCategory/${searchTerm.toLowerCase()}`);
        } else {
            navigate(`/seller-dashboard/search-product/${searchTerm}`);
        }
        setSearchTerm("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo" onClick={() => navigate("/")}><span id="k">KR</span><span id="z">zy</span><span id="kart">Kart</span>.co</div>
                <ul className="menu">
                    <li onClick={() => navigate("/display-products")}>PRODUCTS</li>
                    <li onClick={() => navigate("/display-products/men")}>MEN</li>
                    <li onClick={() => navigate("/display-products/women")}>WOMEN</li>
                    <li onClick={() => navigate("/display-products/kids")}>KIDS</li>
                    <li onClick={() => navigate("/display-products/home")}>HOME & LIVING</li>
                    <li onClick={() => navigate("/display-products/beauty")}>BEAUTY</li>
                </ul>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for products, brands and more"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <FaSearch className="search-icon" onClick={handleSearch} />
                </div>
                <div className="icons">
                    {isLoggedIn && userData && userData.role ? (
                        userData.role === 'seller' ? (
                            <div className="icon-item" onClick={() => navigate("/seller-dashboard")}>
                                <FaUser />
                                <span>Seller Dashboard</span>
                            </div>
                        ) : userData.role === 'admin' ? (
                            <div className="icon-item" onClick={() => navigate("/admin-dashboard")}>
                                <FaUser />
                                <span>Admin Dashboard</span>
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
                    {isLoggedIn && (
                        <div>
                            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}


