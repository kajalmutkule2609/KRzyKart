import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // 🔥 Correct hook
import { getProductsByNamePattern } from '../../Apis/productApi.api'; // API call
import './SearchProduct.css'; 

const SearchProduct = () => {
    const { searchTerm } = useParams();  // 🔥 Correct way

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products by name pattern
    const fetchProductsByNamePattern = async (productName) => {
        try {
            setLoading(true);
            const data = await getProductsByNamePattern(productName); // API call
            setSearchResults(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            fetchProductsByNamePattern(searchTerm);  // Use new API function here
        }
    }, [searchTerm]);

    return (
        <div className="search-container">
            <h2 className="search-heading">Results for "{searchTerm}"</h2>
            {loading ? (
                <p className="loading">Loading...</p>
            ) : (
                <>
                    {searchResults.length > 0 ? (
                        <div className="products-grid">
                            {searchResults.map((product) => (
                                <div className="product-card" key={product.prodId}>
                                    <img
                                        src={product.imageUrl || 'https://via.placeholder.com/150'} 
                                        alt={product.prodName}
                                        className="product-image"
                                    />
                                    <div className="product-info">
                                        <h3>{product.prodName}</h3>
                                        <p className="price">₹{product.price}</p>
                                        <p className="desc">{product.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-results">No products found.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchProduct;
