import React, { useState } from 'react';
import './UpdateProduct.css';
import { updateProduct } from '../../Apis/productApi.api';

const UpdateProduct = ({ onClose }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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
      await updateProduct(productName, updatedProduct);
      alert('Product updated successfully!');
      onClose();
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
          <input value={productName} onChange={(e) => setProductName(e.target.value)} required />

          <label>New Price:</label>
          <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />

          <label>New Quantity:</label>
          <input type="number" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} required />

          <label>Description:</label>
          <input value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />

          <label>Image URL:</label>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

          <button className='sb' type="submit">Update</button>
          <button className='sb' type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
