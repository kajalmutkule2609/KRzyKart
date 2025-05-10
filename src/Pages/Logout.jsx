import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Logout = () => {
  const { clearCart } = useContext(CartContext); 

  const handleLogout = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData?.userId;

    if (userId) {
      localStorage.removeItem(`cart_${userId}`);
    }

    localStorage.removeItem("userData");
    localStorage.removeItem("isLoggedIn");

    clearCart();

    window.location.href = "/login";
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
