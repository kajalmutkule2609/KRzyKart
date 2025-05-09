import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../../Apis/productApi.api';
import './SearchProduct.css';

const ProductsByCategory = () => {
    const { category } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                setLoading(true);
                const normalizedCategory = category?.toLowerCase(); 
                if (!normalizedCategory) {
                    setCategoryProducts([]);
                    setLoading(false);
                    return;
                }

                const data = await getProductsByCategory(normalizedCategory);
                console.log("Fetched Category Products:", data); 
                
                if (Array.isArray(data) && data.length > 0) {
                    setCategoryProducts(data); 
                } else {
                    setCategoryProducts([]); 
                }
            } catch (error) {
                console.error("Error fetching category products:", error);
                setCategoryProducts([]); 
            } finally {
                setLoading(false); 
            }
        };

        if (category) {
            fetchCategoryProducts(); 
        }
    }, [category]);

    return (
        <div className="search-container">
            <h2 className="search-heading">Products in "{category}"</h2>

            {loading ? (
                <p className="loading">Loading...</p>
            ) : (
                <>
                    {categoryProducts.length > 0 ? (
                        <div className="products-grid">
                            {categoryProducts.map((product) => (
                                <div className="product-card" key={product.id}>
                                    <div className="product-image-container">
                                        <img
                                            src={product.imageUrl || 'https://via.placeholder.com/150'}
                                            alt={product.name}
                                            className="product-image"
                                        />
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-title">{product.name}</h3>
                                        <div className="product-rating">
                                            {[...Array(5)].map((star, index) => (
                                                <span
                                                    key={index}
                                                    className={`star ${index < product.rating ? 'filled' : ''}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <p className="price">₹{product.price}</p>
                                        <p className="description">{product.description || "No description available."}</p>

                                        <div className="product-buttons">
                                            <button className="btn-add-to-cart">Add to Cart</button>
                                            <button className="btn-view-details">View Details</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-results">No products found in this category.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductsByCategory;
