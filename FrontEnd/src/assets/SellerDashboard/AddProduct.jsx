import React, { useState } from 'react';
import { addProduct } from '../../Apis/productApi.api';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      prodName: productName,
      price: productPrice,
    };
    try {
      await addProduct(product);
      console.log('Product added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <br />
        <label>Product Price:</label>
        <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;

