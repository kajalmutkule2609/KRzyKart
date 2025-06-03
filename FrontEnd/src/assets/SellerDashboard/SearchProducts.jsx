import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByDescPattern } from '../../Apis/productApi.api'; // Updated API function
import { CartContext } from '/src/CategoryProductPages/CartContext';
import { WishlistContext } from '/src/CategoryProductPages/WishlistContext';
import { FaHeart } from "react-icons/fa";
import './SearchProduct.css';

const SearchProduct = () => {
  const { searchTerm } = useParams();

  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [priceRangeOption, setPriceRangeOption] = useState('');

  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist, fetchWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchProductsByDesc = async (desc) => {
      try {
        setLoading(true);
        const data = await getProductsByDescPattern(desc); // Use desc-based search
        setSearchResults(data);
        setFilteredResults(data);
        console.log("Fetched Products by Description:----->", data);
        await fetchWishlist();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchProductsByDesc(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    let updated = [...searchResults];

    if (priceRangeOption) {
      let [min, max] = [0, Number.MAX_SAFE_INTEGER];
      if (priceRangeOption === "0-1000") [min, max] = [0, 1000];
      else if (priceRangeOption === "1000-5000") [min, max] = [1000, 5000];
      else if (priceRangeOption === "5000-50000") [min, max] = [5000, 50000];
      else if (priceRangeOption === "50000+") [min, max] = [50000, Number.MAX_SAFE_INTEGER];

      updated = updated.filter(p => p.price >= min && p.price <= max);
    }

    if (sortOption === "lowToHigh") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredResults(updated);
  }, [priceRangeOption, sortOption, searchResults]);

  const selected = useMemo(() => {
    return filteredResults.find((p) => p.prodId === selectedId);
  }, [selectedId, filteredResults]);

  const isInWishlist = (product) =>
    wishlist.some((w) => Number(w.productId) === Number(product.prodId));

  const handleWishlistToggle = async (product) => {
    const existing = wishlist.find((w) => Number(w.productId) === Number(product.prodId));

    if (existing) {
      await removeFromWishlist(existing.id);
    } else {
      const newItem = {
        id: Date.now(),
        productId: product.prodId,
        prodName: product.prodName,
        price: product.price,
        description: product.description,
        image: product.imageUrl,
        quantity: 1,
      };
      await addToWishlist(newItem);
    }
  };

  return (
    <div className="search-container">
      <h2 className="search-heading">Results for "{searchTerm}"</h2>

      <div className="filters-container">
        <select onChange={(e) => setSortOption(e.target.value)} className="filter-select" value={sortOption}>
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

        <select onChange={(e) => setPriceRangeOption(e.target.value)} className="filter-select" value={priceRangeOption}>
          <option value="">Filter by Price</option>
          <option value="0-1000">₹0 - ₹1000</option>
          <option value="1000-5000">₹1000 - ₹5000</option>
          <option value="5000-50000">₹5000 - ₹50000</option>
          <option value="50000+">₹50000+</option>
        </select>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : filteredResults.length > 0 ? (
        <div className="products-grid">
          {filteredResults.map((product) => (
            <div className="product-card" key={product.prodId} onClick={() => setSelectedId(product.prodId)}>
              <img
                src={product.imageUrl}
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

      {selected && (
        <div className="product-modal-overlay" onClick={() => setSelectedId(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <div className="wishlist-icon" onClick={() => handleWishlistToggle(selected)}>
              <FaHeart color={isInWishlist(selected) ? "red" : "black"} size={28} />
            </div>

            <img src={selected.imageUrl} alt={selected.prodName} className="modal-image" />
            <h2>{selected.prodName}</h2>
            <p>{selected.description}</p>
            <div><strong>Price:</strong> ₹{selected.price}</div>
            <div>
              <strong>Status:</strong>{" "}
              <span style={{ color: selected.quantity > 0 ? "green" : "red", fontWeight: "bold" }}>
                {selected.quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="modal-actions">
              <button className='bbtn'
                onClick={() => {
                  const userData = JSON.parse(localStorage.getItem("userData"));
                  const userId = userData?.userId;
                  addToCart(selected, userId);
                  setSelectedId(null);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
