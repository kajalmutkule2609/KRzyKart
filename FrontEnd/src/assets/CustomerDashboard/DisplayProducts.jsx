import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  getAllProducts,
  sortProductsByPriceLowToHighByCategory,
  sortProductsByPriceHighToLowByCategory,
  getProductsByCategory,
  getProductsByPriceRange,
  getProductsByPriceHighToLow,
  getProductsByPriceLowToHigh,
 getAllProductsByPriceRange,  
} from "../../Apis/productApi.api";
import { CartContext } from "/src/CategoryProductPages/CartContext";
import { WishlistContext } from "/src/CategoryProductPages/WishlistContext";
import "./DisplayProducts.css";
import { FaHeart } from "react-icons/fa";

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [selectedId, setSelectedId] = useState(null);
  const { category } = useParams();
  const { addToCart } = useContext(CartContext);
  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    fetchWishlist,
  } = useContext(WishlistContext);

  const [sortOption, setSortOption] = useState("");
  const [priceRangeOption, setPriceRangeOption] = useState("");

  // Fetch all products or category-based products
  useEffect(() => {
    (async () => {
      let data;

      if (category) {
        // Fetch category-based products
        if (sortOption === "lowToHigh") {
          data = await sortProductsByPriceLowToHighByCategory(category);
        } else if (sortOption === "highToLow") {
          data = await sortProductsByPriceHighToLowByCategory(category);
        } else {
          data = await getProductsByCategory(category);
        }
      } else {
        // Fetch all products
        if (sortOption === "lowToHigh") {
          data = await getProductsByPriceLowToHigh();
        } else if (sortOption === "highToLow") {
          data = await getProductsByPriceHighToLow();
        } else {
          data = await getAllProducts();
 console.log("Product Data=========",data.imageUrl);
        }
      }
     
      if (priceRangeOption) {
        let range1 = 0;
        let range2 = Number.MAX_SAFE_INTEGER;

        switch (priceRangeOption) {
          case "0-1000":
            range1 = 0;
            range2 = 1000;
            break;
          case "1000-5000":
            range1 = 1000;
            range2 = 5000;
            break;
          case "5000-50000":
            range1 = 5000;
            range2 = 50000;
            break;
          case "50000+":
            range1 = 50000;
            range2 = 1000000;
            break;
          default:
            return;
        }

  
        if (category) {
          data = await getProductsByPriceRange(range1, range2, category);
        } else {
          data = await getAllProductsByPriceRange(range1, range2);
        }
      }

      setProducts(data);
      setFilteredProducts(data); 
      await fetchWishlist();
    })();
  }, [category, sortOption, priceRangeOption]);

  useEffect(() => {
    if (sortOption) {
      let sortedProducts = [...filteredProducts];
      
      if (sortOption === "lowToHigh") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === "highToLow") {
        sortedProducts.sort((a, b) => b.price - a.price);
      }

      setProducts(sortedProducts); 
    }
  }, [sortOption, filteredProducts]);
  
  const selected = useMemo(() => {
    return products.find((p) => p.prodId === selectedId);
  }, [selectedId, products]);

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
        imageUrl: product.imageUrl,
        quantity: 1,
      };
      await addToWishlist(newItem);
    }
  };

  return (
    <div className="customer-products-container">
      <h2 className="section-title">
        {category ? `Products in "${category}"` : "Our Products"}
      </h2>

      <div className="filters-container">
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className="filter-select"
          value={sortOption}
        >
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

        <select
          onChange={(e) => setPriceRangeOption(e.target.value)}
          className="filter-select"
          value={priceRangeOption}
        >
          <option value="">Filter by Price</option>
          <option value="0-1000">₹0 - ₹1000</option>
          <option value="1000-5000">₹1000 - ₹5000</option>
          <option value="5000-50000">₹5000 - ₹50000</option>
          <option value="50000+">₹50000+</option>
        </select>
      </div>

      <div className="product-grid-5">
        {products.map((p) => (
          <div
            key={p.prodId}
            className="product-card"
            onClick={() => setSelectedId(p.prodId)}
          >
            <img src={p.imageUrl} alt={p.prodName} className="product-image" />
            <div className="product-details">
              <div className="product-name">{p.prodName}</div>
              <div className="product-price">₹{p.price}</div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="product-modal-overlay" onClick={() => setSelectedId(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <div
              className="wishlist-icon"
              onClick={() => handleWishlistToggle(selected)}
              title={isInWishlist(selected) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <FaHeart color={isInWishlist(selected) ? "red" : "black"} size={28} />
            </div>

            <img src={selected.imageUrl} alt={selected.prodName} className="modal-image" />
            <h2>{selected.prodName}</h2>
            <p>{selected.description}</p>
            <div>
              <strong>Price:</strong> ₹{selected.price}
            </div>
            <div>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: selected.quantity > 0 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {selected.quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="modal-actions">
              <button className="cartbtn"
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

export default DisplayProducts;