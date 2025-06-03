import React, { useState, useEffect } from 'react';
import './UpdateProduct.css';
import { updateProduct } from '../../Apis/productApi.api';

const UpdateProduct = ({ onClose, product }) => {
  const [productName, setProductName] = useState(product.prodName || '');
  const [productPrice, setProductPrice] = useState(product.price || '');
  const [productQuantity, setProductQuantity] = useState(product.quantity || '');
  const [productDescription, setProductDescription] = useState(product.description || '');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (product) {
      setProductName(product.prodName);
      setProductPrice(product.price);
      setProductQuantity(product.quantity);
      setProductDescription(product.description);
      setImageUrl(product.imageUrl || '');
    }
  }, [product]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      prodName: productName,
      price: productPrice,
      quantity: productQuantity,
      description: productDescription,
      imageUrl: imageUrl,
    };

    try {
      await updateProduct(product.prodName, updatedProduct);
      alert('Product updated successfully!');
      onClose(); // Close modal after update
    } catch (err) {
      console.error(err);
      alert('Failed to update product');
    }
  };

  return (
    <div className="product-popup-overlay" onClick={onClose}>
      <div className="product-popup" onClick={(e) => e.stopPropagation()}>
        <h3 className='title'>Update Product</h3>
        <form onSubmit={handleUpdate} className='update-form'>
          <label>Product Name (to update):</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />

          <label>New Price:</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />

          <label>New Quantity:</label>
          <input
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            required
          />

          <label>Description:</label>
          <input
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />

          <label>Image URL:</label>
          <input
            type="file"
            onChange={(e) => setImageUrl(e.target.value)} // handle file upload
          />

          <button className='sb' type="submit">Update</button>
          <button className='sb' type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
