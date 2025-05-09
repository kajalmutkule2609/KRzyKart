import axios from "axios";

const API_URL = 'http://localhost:8080/ECommerceWebsite/Wishlist';

// Add a product to the wishlist
export const addToWishlist = (wishlistData) => {
    return axios.post(`${API_URL}/addToWishlist`, wishlistData);
  };
  
  // Get wishlist data for a specific user
  export const getMyWishlistData = (userId) => {
    return axios.get(`${API_URL}/getMyWishlistData/${userId}`);
  };
  
  // View all wishlist data (admin/general view)
  export const viewAllWishlistData = () => {
    return axios.get(`${API_URL}/viewAllWishlistData`);
  };
  
  // Remove an item from the wishlist
  export const removeFromWishlist = (wishlistId) => {
    return axios.delete(`${API_URL}/removeFromWishlist/${wishlistId}`);
  };