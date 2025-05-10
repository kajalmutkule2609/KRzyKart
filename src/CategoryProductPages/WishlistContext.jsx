import React, { createContext, useReducer, useState } from "react";
import {
  addToWishlist as apiAddToWishlist,
  getMyWishlistData as apiGetMyWishlistData,
  removeFromWishlist as apiRemoveFromWishlist,
} from "../Apis/wishlistApi.api";

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_WISHLIST":
      return action.wishlist;
    case "ADD_TO_WISHLIST":
      return [...state, action.product];
    case "REMOVE_FROM_WISHLIST":
      return state.filter((p) => p.id !== action.productId);
    default:
      return state;
  }
};

const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);
  const [wishlistVersion, setWishlistVersion] = useState(0);

  const fetchWishlist = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?.userId;
      if (!userId) return;
  
      const response = await apiGetMyWishlistData(userId);
      const data = response.data;
  
      // ✅ Add this debug log first
      console.log("Raw wishlist response:", data);
  
      // ✅ Defensive check for array structure
      const items = Array.isArray(data) ? data : data?.wishlist || data?.data || [];
  
      const formattedWishlist = items.map((item) => ({
        id: item.wishId,
        productId: item.pid,
        prodName: item.prodName,
        price: item.price,
        description: item.description || "",
        image: item.imageUrl,
      }));
  
      dispatch({ type: "LOAD_WISHLIST", wishlist: formattedWishlist });
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
  };
  
  const addToWishlist = async (product) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData?.userId;
    if (!userId) return;

    const pid = product.productId;
    const payload = { userId, pid };

    try {
      await apiAddToWishlist(payload);
      dispatch({ type: "ADD_TO_WISHLIST", product });
      setWishlistVersion((v) => v + 1);
    } catch (err) {
      console.error("Failed to add to wishlist:", err.response?.data || err.message);
    }
  };

  const removeFromWishlist = async (wishlistId) => {
    try {
      await apiRemoveFromWishlist(wishlistId);
      dispatch({ type: "REMOVE_FROM_WISHLIST", productId: wishlistId });
      setWishlistVersion((v) => v + 1);
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, wishlistVersion, fetchWishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistProvider, WishlistContext };
