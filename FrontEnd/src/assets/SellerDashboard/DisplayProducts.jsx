import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../Apis/productApi.api';
const GetAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Get All Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.prodName}>{product.prodName} - {product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllProducts;

