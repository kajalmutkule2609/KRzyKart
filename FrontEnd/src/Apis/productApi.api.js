import axios from 'axios';


const API_URL = 'http://localhost:8080/ECommerceWebsite/Product';

const addProduct = (formData) => {
  return axios.post(`${API_URL}/addProduct`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

 
  // Get all products
  const getAllProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/getAllProducts`);
      const data = await response.json();
      console.log(data); 
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

    
 const getProductsBySellerId = async (userId) => {
  try {
      const response = await fetch(`${API_URL}/getProductsBySellerId/${userId}`);
      if (!response.ok) {
          throw new Error('Failed to fetch products for given Seller');
      }
      
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching products by SellerId:', error);
      throw error;  
  }
};
  
 const getProductsByCategory = async (category) => {
    try {
        const response = await fetch(`${API_URL}/getProductsByCategory/${category}`);
        if (!response.ok) {
            throw new Error('Failed to fetch category products');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;  
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
      return []; 
    }
  };
  
  
  // Delete product
  const deleteProduct = async (productName) => {
    try {
      const response = await fetch(`${API_URL}/deleteProduct/${productName}`, {
        method: "DELETE",
      });
      const data = await response.text(); 
      console.log('Delete Response:', data);
      return data; 
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
 const updateProduct = async (productName, product, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(`${API_URL}/updateProduct/${encodeURIComponent(productName)}`, {
      method: "PUT",
      body: formData,
    });

    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

  const getProdIdByName = async (prodName) => {
    try {
      const response = await axios.get(`${API_URL}/getProdIdByName/${prodName}`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching product ID by name:", error);
      return -1;
    }
  };
  const getProductNameById = async (prodId) => {
    try {
      const response = await axios.get(`${API_URL}/getProdNameById/${prodId}`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching product Name by Id:", error);
      return -1;
    }
  };
  const getProductsByNamePattern = async (productName) => {
    try {
      const response = await fetch(`${API_URL}/getProductsByProductNamePattern/${productName}`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return []; 
    }
  };

  const getProductsByDescPattern = async (desc) => {
    try {
      const response = await fetch(`${API_URL}/getProductsByDescPattern/${desc}`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return []; 
    }
  };
 const sortProductsByPriceLowToHighByCategory = async (categoryName) => {
  try {
    const response = await fetch(`${API_URL}/sortProductByPriceLowToHighByCategory/${categoryName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products sorted low to high:", error);
    return [];
  }
};


const sortProductsByPriceHighToLowByCategory = async (categoryName) => {
  try {
    const response = await fetch(`${API_URL}/sortProductByPriceHighToLowByCategory/${categoryName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products sorted high to low:", error);
    return [];
  }
};
const getProductsByPriceRange = async (min, max, category) => {
  try {
    const response = await axios.get(`${API_URL}/filterByPriceRange`, {
      params: {
        min: min,
        max: max,
        category: category,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products by price range:", error);
    return [];
  }
};
const getAllProductsByPriceRange = async (min, max) => {
  try {
    const response = await axios.get(`${API_URL}/filterAllByPriceRange`, {
      params: {
        min: min,
        max: max
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products by price range:", error);
    return [];
  }
};
export {
  addProduct,
  getProductsBySellerId,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsByProductName,
  getProductsByPriceHighToLow,
  getProductsByPriceLowToHigh,
  getProductsByCategory,
  getProdIdByName,
  getProductNameById,
  getProductsByNamePattern,
  sortProductsByPriceLowToHighByCategory,
  sortProductsByPriceHighToLowByCategory,
  getProductsByPriceRange,
  getAllProductsByPriceRange,
  getProductsByDescPattern
};
