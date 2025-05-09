import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  getAllProducts,
  getProductsByCategory,
  getProductsByPriceLowToHigh,
  getProductsByPriceHighToLow,
} from "../../Apis/productApi.api";
import { CartContext } from "/src/CategoryProductPages/CartContext";
import { WishlistContext } from "/src/CategoryProductPages/WishlistContext";
import "./DisplayProducts.css";
import { FaHeart } from "react-icons/fa";

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const { category } = useParams();
  const { addToCart } = useContext(CartContext);
  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    fetchWishlist,
  } = useContext(WishlistContext);

  const [sortOption, setSortOption] = useState(""); // State to track the sorting option

  useEffect(() => {
    (async () => {
      let data;
      if (category) {
        // If there's a category, fetch products by category
        data = await getProductsByCategory(category);
      } else {
        // Fetch all products if no category
        data = await getAllProducts();
      }

      // Handle sorting if a sort option is selected
      if (sortOption === "lowToHigh") {
        data = await getProductsByPriceLowToHigh(); // Fetch sorted by price low to high
      } else if (sortOption === "highToLow") {
        data = await getProductsByPriceHighToLow(); // Fetch sorted by price high to low
      }

      setProducts(data); // Update the products state with the fetched data
      await fetchWishlist(); // Fetch wishlist for the user
    })();
  }, [category, sortOption]); // Re-fetch products when category or sort option changes

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
        image: product.imageUrl,
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
        {/* Sort by price dropdown */}
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className="filter-select"
          value={sortOption}
        >
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="product-grid-5">
        {products.map((p) => (
          <div
            key={p.prodId}
            className="product-card"
            onClick={() => setSelectedId(p.prodId)} // Update selected ID on card click
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
        <div
          className="product-modal-overlay"
          onClick={() => setSelectedId(null)} // Close modal on click outside
        >
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <div
              className="wishlist-icon"
              onClick={() => handleWishlistToggle(selected)}
              title={
                isInWishlist(selected)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >
              <FaHeart
                color={isInWishlist(selected) ? "red" : "black"}
                size={28}
              />
            </div>

            <img
              src={selected.imageUrl}
              alt={selected.prodName}
              className="modal-image"
            />
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
              <button
                onClick={() => {
                  const userData = JSON.parse(localStorage.getItem("userData"));
                  const userId = userData?.userId;
                  addToCart(selected, userId);
                  setSelectedId(null); // Close the modal after adding to cart
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
