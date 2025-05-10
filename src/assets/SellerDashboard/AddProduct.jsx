import React, { useState, useEffect } from 'react';
import { addProduct } from '../../Apis/productApi.api.js';
import {getAllCategories } from '../../Apis/categoryApi.api.js';
import './AddProduct.css';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [cid, setCid] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData?.userId;
    setUid(userId);

    getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      prodName: productName,
      price: productPrice,
      quantity,
      description: productDescription,
      imageUrl,
      cid,
      userId: uid,
    };

    try {
      const res = await addProduct(product);
      setMessage('Product added successfully!');
      setProductName('');
      setProductPrice('');
      setQuantity('');
      setProductDescription('');
      setImageUrl('');
      setCid('');
    } catch (error) {
      console.error(error);
      setMessage('Error adding product');
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><label>Product Name:</label></td>
              <td><input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label>Price:</label></td>
              <td><input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label>Quantity:</label></td>
              <td><input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label>Description:</label></td>
              <td><textarea className="des" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} /></td>
            </tr>
            <tr>
              <td><label>Image URL:</label></td>
              <td><input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} /></td>
            </tr>
            <tr>
              <td><label>Category:</label></td>
              <td>
                <select className="des" value={cid} onChange={(e) => setCid(e.target.value)} required>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.cid} value={cat.cid}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan={2}><button type="submit">Add Product</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddProduct;
