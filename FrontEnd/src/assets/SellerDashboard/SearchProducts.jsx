import React, { useState } from 'react';
import { getProductsByProductName } from '../../Apis/productApi.api';

 const SearchProduct = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await getProductsByProductName(productName);
      setProduct(data[0]);
    } catch (error) {
      console.error(error);
    }


  return (
    <div>
      <h2>Search Products</h2>
      <form onSubmit={handleSearch}>
        <label>Search:</label>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
 }

export default SearchProduct;