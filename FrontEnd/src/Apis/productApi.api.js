import axios from 'axios';


const API_URL = 'http://localhost:8080/ECommerceWebsite/Product';
const addProduct = async (product) => {
    try {
      const response = await fetch(`${API_URL}/addProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  // Get all products
  const getAllProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/getAllProducts`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  // Get products by category
  const getProductsByCategory = async (category) => {
    try {
      const response = await fetch(`${API_URL}/getProductsByCategory/${category}`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  // Get products by price low to high
  const getProductsByPriceLowToHigh = async () => {
    try {
      const response = await fetch(`${API_URL}/getProductByPriceLowToHigh`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  // Get products by price high to low
  const getProductsByPriceHighToLow = async () => {
    try {
      const response = await fetch(`${API_URL}/getProductByPriceHighToLow`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  // Get products by product name
  const getProductsByProductName = async (productName) => {
    try {
      const response = await fetch(`${API_URL}/getProductsByProductName/${productName}`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  // Delete product
  const deleteProduct = async (productName) => {
    try {
      const response = await fetch(`${API_URL}/deleteProduct/${productName}`, {
        method: "DELETE",
      });
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  // Update product
  const updateProduct = async (productName, product) => {
    try {
      const response = await fetch(`${API_URL}/updateProduct/${productName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  
export {addProduct,getAllProducts,updateProduct,deleteProduct,getProductsByProductName,getProductsByPriceHighToLow,getProductsByPriceLowToHigh,getProductsByCategory };