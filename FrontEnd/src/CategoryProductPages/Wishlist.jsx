import React, { useContext } from "react";
import { WishlistContext } from "./WishlistContext";
import { CartContext } from "./CartContext";
import "../CategoryProductPages/Wishlist.css";
const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { cart, addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      addToCart({ ...product, quantity: existingProduct.quantity + 1 });
    } else {
      addToCart({ ...product, quantity: 1 });
    }
    removeFromWishlist(product.id);
  };

  return (
    <div>
      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <div key={product.id} className="wishlist-card">
            <img src={product.image} alt={product.prodName} className="wishlist-image" />
            <div className="wishlist-details">
              <h4>{product.prodName}</h4>
              <p>Price: ₹{product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Description: {product.description}</p>
              <button className="wlst" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              <button className="wlst" onClick={() => removeFromWishlist(product.id)}>Remove from Wishlist</button>
            </div>
          </div>
        ))}
 </div>
    </div>
  );
};

export default Wishlist;
