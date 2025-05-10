import React, { useContext, useEffect } from "react";
import { WishlistContext } from "./WishlistContext";
import { CartContext } from "../CategoryProductPages/CartContext";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, fetchWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleAddToCart = async (p) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData?.userId;

    if (!userId) {
      alert("User not logged in");
      return;
    }

    const cartItem = {
      id: p.productId, 
      prodName: p.prodName, 
      price: p.price, 
      image: p.image, 
      quantity: 1,
    };
      console.log("ProductId:",p.productId);
      console.log("userId:",userId);
      console.log("wishlid:",p.id);

    try {
      await addToCart(cartItem,userId);
      await removeFromWishlist(p.id);  
      alert("Added to cart successfully");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="wishlist-grid">
      {wishlist.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your wishlist is empty.</p>
      ) : (
        wishlist.map((p) => (
          <div key={p.id} className="wishlist-card">
            <img src={p.image} alt={p.prodName} className="wishlist-image" />
            <div className="wishlist-details">
              <h4>{p.prodName}</h4>
              <p>Price: ₹{p.price}</p>
              <p>{p.description}</p>

              <button onClick={() => handleAddToCart(p)}>Add to Cart</button>

              <button
                onClick={() => removeFromWishlist(p.id)}
                style={{ backgroundColor: "#e74c3c", color: "#fff", marginTop: "5px" }}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
