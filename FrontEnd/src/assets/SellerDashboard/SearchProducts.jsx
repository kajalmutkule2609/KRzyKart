import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // 🔥 Correct hook
import { getProductsByProductName } from '../../Apis/productApi.api';
import './SearchProduct.css'; 

const SearchProduct = () => {
    const { searchTerm } = useParams();  // 🔥 Correct way

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProductsByProductName(searchTerm);
                setSearchResults(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (searchTerm) {
            fetchProducts();
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
                                <div className="product-card" key={product.id}>
                                    <img
                                        src={product.imageUrl || 'https://via.placeholder.com/150'} 
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    <div className="product-info">
                                        <h3>{product.name}</h3>
                                        <p className="price">₹{product.price}</p>
                                        <p className='desc'>{product.description}</p>
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
