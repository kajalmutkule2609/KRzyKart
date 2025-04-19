import React, { useState } from 'react';
import { updateProduct } from '../../Apis/productApi.api';

const UpdateProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productId, setProductId] = useState(0);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const product = {
      prodName: productName,
      price: productPrice,
    };
    try {
      await updateProduct(productId, product);
      console.log('Product updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleUpdate}>
        <label>Product ID:</label>
        <input type="number" value={productId} onChange={(e) => setProductId(e.target.value)} />
        <br />
        <label>Product Name:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <br />
        <label>Product Price:</label>
        <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
        <br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
