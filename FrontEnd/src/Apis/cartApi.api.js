import axios from "axios";

const API_URL = 'http://localhost:8080/ECommerceWebsite/Cart';

// Add a product to the cart
export const addToCart = async (cartData) => {
  try {
    const response = await fetch(`${API_URL}/addToCart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    });

    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }

    const result = await response.text(); 
    return result;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Get cart data for a specific user
export const getMyCartData = (userId) => {
  return axios.get(`${API_URL}/getMyCartData/${userId}`);
};

// View all cart data (admin or general access)
export const viewAllCartData = () => {
  return axios.get(`${API_URL}/viewAllCartData`);
};

// Increment quantity of a specific cart item
export const incrementQuantity = (cartId) => {
  return axios.put(`${API_URL}/incrementQty/${cartId}`);
};

// Decrement quantity of a specific cart item
export const decrementQuantity = (cartId) => {
  return axios.put(`${API_URL}/decrementQty/${cartId}`);
};

// Remove an item from the cart
export const removeFromCart = (cartId) => {
  return axios.delete(`${API_URL}/removeFromCart/${cartId}`);
};
export const removeFromCartBypId = (pId) => {
  return axios.delete(`${API_URL}/removeFromCartByPid/${pId}`);
};