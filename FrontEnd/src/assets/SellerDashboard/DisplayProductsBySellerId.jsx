import React, { useState, useEffect } from 'react';
import { deleteProduct, getProductsBySellerId } from '../../Apis/productApi.api';
import './DisplayProducts.css';
import UpdateProduct from './UpdateProducts';

const GetAllProductsBySellerId = () => {
  const [products, setProducts] = useState([]);
  const [uid, setUid] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // state for selected product to update
  const [showUpdateModal, setShowUpdateModal] = useState(false); // state to control the modal visibility

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const userId = userData?.userId;
        setUid(userId);

        if (!userId) {
          console.error("User ID not found in localStorage.");
          return;
        }

        const data = await getProductsBySellerId(userId);
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

  // Open Update Modal and pass selected product to it
  const handleUpdateProduct = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  return (
    <div className="products-wrapper1">
      <div className="products-grid1">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card1" key={product.prodId}>
              <div className="image-container1">
                <img src={product.imageUrl} alt={product.prodName} className="product-image1" />
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
                <button
                  className="update-btn"
                  onClick={() => handleUpdateProduct(product)} // open modal to update
                >
                  Update
                </button>
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
      
      {/* Show Update Modal if selectedProduct exists */}
      {showUpdateModal && selectedProduct && (
        <UpdateProduct
          onClose={() => setShowUpdateModal(false)} // Close the modal
          product={selectedProduct} // Pass selected product for updating
        />
      )}
    </div>
  );
};

export default GetAllProductsBySellerId;
