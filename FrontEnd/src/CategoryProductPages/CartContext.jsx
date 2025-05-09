import React, { createContext, useReducer, useEffect } from "react";
import {
  addToCart as apiAddToCart,
  getMyCartData,
  incrementQuantity as apiIncrementQuantity,
  decrementQuantity as apiDecrementQuantity,
  removeFromCart as apiRemoveFromCart
} from "../Apis/cartApi.api";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
      return action.cart;
    case "ADD_TO_CART":
      return [...state, { ...action.product, quantity: action.product.quantity }];
    case "UPDATE_CART_QUANTITY":
      return state.map((product) =>
        product.id === action.productId ? { ...product, quantity: action.quantity } : product
      );
    case "REMOVE_FROM_CART":
      return state.filter((product) => product.id !== action.productId);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

// Fetch cart from localStorage based on userId
const getStoredCart = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.userId;

  if (userId) {
    const storedCart = localStorage.getItem(`cart_${userId}`);
    return storedCart ? JSON.parse(storedCart) : [];
  }

  return [];
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, getStoredCart());

  // Whenever cart is updated, save to localStorage for the specific user
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData?.userId;

    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    }
  }, [cart]);

  // Fetch cart data from the backend for the logged-in user
  const fetchCartData = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData?.userId;

    if (!userId) return;

    try {
      const response = await getMyCartData(userId);
      const serverCart = response.data.map((item) => ({
        id: item.cartId,
        cartId: item.cartId,
        pid: item.productId,
        prodName: item.prodName,
        price: Number(item.price),
        quantity: item.quantity,
        image: item.imageUrl,
      }));

      dispatch({ type: "LOAD_CART", cart: serverCart });
    } catch (error) {
      console.error("Failed to reload cart:", error);
    }
  };

  const addToCart = async (product, userId) => {
    const productId = product.prodId || product.id;  
    const price = Number(product.price);
    const quantity = 1;
    const image = product.imageUrl || product.image || "";
    const name = product.prodName || product.name || "Unnamed";
  
    if (!productId || !userId || isNaN(price)) {
      console.error("Invalid product or user info");
      return;
    }
  
    const existingProduct = cart.find((item) => item.id === productId);
  
    if (existingProduct) {
      const newQty = existingProduct.quantity + quantity;
      dispatch({
        type: "UPDATE_CART_QUANTITY",
        productId: existingProduct.id,
        quantity: newQty,
      });
  
      try {
        await apiAddToCart({ userId, pid: productId, quantity: newQty });
      } catch (err) {
        console.error("Server sync failed", err);
      }
    } else {
      const newProduct = {
        id: productId,
        prodName: name,
        price,
        image,
        quantity,
      };
  
      dispatch({ type: "ADD_TO_CART", product: newProduct });
  
      try {
        await apiAddToCart({ userId, pid: productId, quantity });
      } catch (err) {
        console.error("Server sync failed", err);
      }
    }
  };
  
  const incrementQuantity = async (cartId) => {
    try {
      await apiIncrementQuantity(cartId);
      await fetchCartData();
    } catch (error) {
      console.error("Failed to increment quantity:", error);
    }
  };

  const decrementQuantity = async (cartId) => {
    const product = cart.find((p) => p.id === cartId);
    if (!product) return;

    if (product.quantity <= 1) {
      try {
        await apiRemoveFromCart(cartId);
        dispatch({ type: "REMOVE_FROM_CART", productId: cartId });
        await fetchCartData();
      } catch (err) {
        console.error("Failed to remove item when quantity = 1", err);
      }
    } else {
      try {
        await apiDecrementQuantity(cartId);
        await fetchCartData();
      } catch (error) {
        console.error("Failed to decrement quantity:", error);
      }
    }
  };

  const handleRemoveFromCart = async (cartId) => {
    try {
      await apiRemoveFromCart(cartId);
      dispatch({ type: "REMOVE_FROM_CART", productId: cartId });
      await fetchCartData();
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        handleRemoveFromCart,
        fetchCartData,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
