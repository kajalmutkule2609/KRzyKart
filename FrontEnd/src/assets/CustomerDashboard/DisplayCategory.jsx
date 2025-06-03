import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../Apis/categoryApi.api';
import './DisplayCategory.css';

const DisplayCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  return (
    <div className="display-category-container">
      <div className="display-category-wrapper">
        <h2 className="display-category-title">All Categories</h2>

        {loading ? (
          <p className="loading-message">Loading categories...</p>
        ) : (
          <table className="category-table">
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category,index) => (
                <tr key={category.cid}>
                  <td>{index+1}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DisplayCategory;
