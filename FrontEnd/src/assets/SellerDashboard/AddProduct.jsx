import React, { useState, useEffect } from 'react';
import { addProduct } from '../../Apis/productApi.api.js';
import { getAllCategories } from '../../Apis/categoryApi.api.js';
import './AddProduct.css';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [cid, setCid] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  const userData = JSON.parse(localStorage.getItem('userData'));
  const uid = userData?.userId;
  console.log("UserId:", uid);
  useEffect(() => {
    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);
  console.log("All Categories:", categories);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      setMessage("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("prodName", productName);
    formData.append("price", productPrice);
    formData.append("quantity", quantity);
    formData.append("description", productDescription);
    formData.append("prodImage", imageFile);
    formData.append("cid", cid);
    formData.append("userId", uid);

    console.log("Product data", formData);
    try {
      const res = await addProduct(formData);
      setMessage("Product added successfully!");
      setProductName('');
      setProductPrice('');
      setQuantity('');
      setProductDescription('');
      setImageFile(null);
      setCid('');
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage("Failed to add product.");
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add New Product</h2>
      {message && <p style={{ color: 'blue', marginBottom: '10px' }}>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <table>
          <tbody>
            <tr>
              <td><label>Product Name:</label></td>
              <td>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </td>
            </tr>

            <tr>
              <td><label>Price:</label></td>
              <td>
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                />
              </td>
            </tr>

            <tr>
              <td><label>Quantity:</label></td>
              <td>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </td>
            </tr>

            <tr>
              <td><label>Description:</label></td>
              <td>
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="des"
                  rows="4"
                  required
                />
              </td>
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
              <td><label>Product Image:</label></td>
              <td>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  required
                />
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                <button type="submit">Add Product</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddProduct;
