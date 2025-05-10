import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getProductsByCategory,
  sortProductsByPriceLowToHighByCategory,
  sortProductsByPriceHighToLowByCategory
} from '../../Apis/productApi.api'; 
import './SearchProduct.css';

const ProductsByCategory = () => {
  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('');


  const fetchProducts = async () => {
    try {
      setLoading(true);
      const normalizedCategory = category?.toLowerCase();
      if (!normalizedCategory) {
        setCategoryProducts([]);
        setLoading(false);
        return;
      }

      let data;
      
      if (sortOrder === 'lowToHigh') {
        data = await sortProductsByPriceLowToHighByCategory(normalizedCategory);
      } else if (sortOrder === 'highToLow') {
        data = await sortProductsByPriceHighToLowByCategory(normalizedCategory);
      } else {
        data = await getProductsByCategory(normalizedCategory);
      }

      console.log("Fetched Category Products:", data);
      if (Array.isArray(data) && data.length > 0) {
        setCategoryProducts(data);
      } else {
        setCategoryProducts([]);
      }
    } catch (error) {
      console.error("Error fetching category products:", error);
      setCategoryProducts([]);
    } finally {
      setLoading(false);
    }
  };

  
  const handleSortChange = (e) => {
    const selectedSortOrder = e.target.value;
    setSortOrder(selectedSortOrder); 
  };

 
  useEffect(() => {
    fetchProducts();
  }, [category, sortOrder]); 
  return (
    <div className="search-container">
      <h2 className="search-heading">Products in "{category}"</h2>

    
      <div className="sort-dropdown">
        <label>Sort By: </label>
        <select onChange={handleSortChange} value={sortOrder}>
          <option value="">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          {categoryProducts.length > 0 ? (
            <div className="products-grid">
              {categoryProducts.map((product) => (
                <div className="product-card" key={product.prodId}>
                  <div className="product-image-container">
                    <img
                      src={product.imageUrl || 'https://via.placeholder.com/150'}
                      alt={product.prodName}
                      className="product-image"
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{product.prodName}</h3>
                    <div className="product-rating">
                      {[...Array(5)].map((star, index) => (
                        <span
                          key={index}
                          className={`star ${index < product.rating ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="price">₹{product.price}</p>
                    <p className="description">{product.description || "No description available."}</p>

                    <div className="product-buttons">
                      <button className="btn-add-to-cart">Add to Cart</button>
                      <button className="btn-view-details">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">No products found in this category.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsByCategory;
