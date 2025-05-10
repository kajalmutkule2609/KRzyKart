import React, { useState } from 'react';
import './CategoryPopup.css';
import { addCategory } from '../../Apis/categoryApi.api'; 
const AddCategory = ({ onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const category = { name, description };

    try {
      const res = await addCategory(category);
      console.log('Category added:', res.data);
      setMessage('Category added successfully!');
      onClose(); 
    } catch (error) {
      console.error('Error adding category:', error);
      setMessage('Failed to add category');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>Add Category</h3>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
