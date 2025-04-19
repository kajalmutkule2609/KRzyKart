import React, { createContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, { ...action.product, quantity: action.product.quantity }];
    case "UPDATE_CART_QUANTITY":
      return state.map((product) => {
        if (product.id === action.productId) {
          return { ...product, quantity: action.quantity };
        }
        return product;
      });
    case "REMOVE_FROM_CART":
      return state.filter((product) => product.id !== action.productId);
    default:
      return state;
  }
};

const getStoredCart = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, getStoredCart());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      dispatch({ type: "UPDATE_CART_QUANTITY", productId: product.id, quantity: existingProduct.quantity + product.quantity });
    } else {
      dispatch({ type: "ADD_TO_CART", product });
    }
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_FROM_CART", productId });
    } else {
      dispatch({ type: "UPDATE_CART_QUANTITY", productId, quantity });
    }
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", productId });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };


