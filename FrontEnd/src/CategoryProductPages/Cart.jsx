import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import "../CategoryProductPages/Cart.css";

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart } = useContext(CartContext);

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
                <img src={product.image} alt={product.prodName} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>
                <button className="btn" onClick={() => updateCartQuantity(product.id, product.quantity - 1)}>-</button>
                {product.quantity}
                <button className="btn" onClick={() => updateCartQuantity(product.id, product.quantity + 1)}>+</button>
              </td>
              <td>₹{product.price * product.quantity}</td>
              <td><button onClick={() => removeFromCart(product.id)}>X</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>Total Price:</td>
            <td>₹{cart.reduce((acc, product) => acc + product.price * product.quantity, 0)}</td>
          </tr>
        </tfoot>
      </table>
      <div className="cart-actions">
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;


