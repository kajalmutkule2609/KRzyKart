import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct } from '../../Apis/productApi.api';
import './DisplayProducts.css';

const GetAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (prodName) => {
    try {
      await deleteProduct(prodName);
      alert('Product deleted successfully!');
      setProducts(products.filter((product) => product.prodName !== prodName));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // const handleUpdateProduct = (prodId) => {
  //   console.log('Update Product clicked for ID:', prodId);
  // };

  return (
    <div className="products-wrapper1">
      <div className="products-grid1">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card1" key={product.prodId}>
              <div className="image-container1">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/280x280?text=No+Image"}
                  alt={product.prodName}
                  className="product-image1"
                />
              </div>
              <div className="product-info">
                <div className="product-name" title={product.description}>
                  {product.prodName}
                </div>
                <div className="product-description">
                  {product.description ? product.description.slice(0, 40) + '...' : 'No description'}
                </div>
                <div className="product-availability">
                  Available: {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </div>
                <div className="product-price">₹{product.price}</div>
              </div>

              <div className="product-actions">
                {/* <button
                  className="update-btn"
                  onClick={() => handleUpdateProduct(product.prodId)}
                >
                  Update
                </button> */}
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteProduct(product.prodName)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default GetAllProducts;
