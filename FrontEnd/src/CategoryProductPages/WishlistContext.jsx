import React, { createContext, useReducer, useEffect } from "react";

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return [...state, action.product];
    case "REMOVE_FROM_WISHLIST":
      return state.filter((product) => product.id !== action.productId);
    default:
      return state;
  }
};

const getStoredWishlist = () => {
  const storedWishlist = localStorage.getItem('wishlist');
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, getStoredWishlist());

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    const existingProduct = wishlist.find((item) => item.id === product.id);
    if (!existingProduct) {
      dispatch({ type: "ADD_TO_WISHLIST", product });
    }
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", productId });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistProvider, WishlistContext };
