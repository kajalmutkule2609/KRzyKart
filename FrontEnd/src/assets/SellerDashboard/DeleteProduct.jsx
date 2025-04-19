import React from 'react';
import {deleteProduct} from '../../Apis/productApi.api';

const DeleteProduct = () => {
  const [productName, setProductName] = React.useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteProduct(productName);
      console.log('Product deleted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <form onSubmit={handleDelete}>
        <label>Product Name:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <br />
        <button type="submit">Delete Product</button>
      </form>
    </div>
  );
};

export default DeleteProduct;

