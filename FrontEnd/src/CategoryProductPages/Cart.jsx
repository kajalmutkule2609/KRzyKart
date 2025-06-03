import React, { useContext, useEffect } from 'react';
import { CartContext } from './CartContext';
import "../CategoryProductPages/Cart.css";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    handleRemoveFromCart,
    incrementQuantity,
    decrementQuantity,
    fetchCartData
  } = useContext(CartContext);

  useEffect(() => {
    fetchCartData();
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((acc, product) => acc + (Number(product.price) * product.quantity), 0);
  };

  return (
    <div className="cart-container">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.id}>
              <td>{product.prodName}</td>
              <td>
                <img
              src={`http://localhost:8080/Images/${product.image}`}
              alt={product.prodName} style={{ maxWidth: '120px', height: '90px' }} />
              </td>
              <td>
                <button className="btn" onClick={() => decrementQuantity(product.id)}>-</button>
                {product.quantity}
                <button className="btn" onClick={() => incrementQuantity(product.id)}>+</button>
              </td>
              <td>₹{Number(product.price) * product.quantity}</td>
              <td>
                <button
                  onClick={() => handleRemoveFromCart(product.id)}
                  className="remove-btn"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>Total Price:</td>
            <td>₹{getTotalPrice()}</td>
          </tr>
        </tfoot>
      </table>
      <div className="cart-actions">
  <button 
    onClick={() => navigate('/checkout')} 
    disabled={cart.length === 0}
    style={{ opacity: cart.length === 0 ? 0.5 : 1, cursor: cart.length === 0 ? 'not-allowed' : 'pointer' }}
  >
    Checkout
  </button>
</div>

    </div>
  );
};

export default Cart;
