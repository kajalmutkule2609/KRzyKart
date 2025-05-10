import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { createOrder, addOrderItem } from "../Apis/orderApi.api"; 
import { getProdIdByName } from "../Apis/productApi.api";
import { useNavigate } from "react-router-dom"; 
import "./Checkout.css";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false); 
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.userId;
  const navigate = useNavigate(); 

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setSubtotal(total);
  }, [cart]);

  const handlePlaceOrder = async () => {
  const status = "Pending";
  const total = subtotal + 50;

  try {
    const orderResponse = await createOrder(userId, total, status);
    const orderId = orderResponse.orderId || orderResponse.data?.orderId;

    if (!orderId) throw new Error("Order ID not returned from server");


    localStorage.setItem("currentOrderId", orderId);

    for (const item of cart) {
      let pid = item.pid;

      if (!pid && item.prodName) {
        pid = await getProdIdByName(item.prodName);
        if (pid === -1) {
          console.warn(`Skipping item: ${item.prodName}, Product ID not found`);
          continue;
        }
      }

      console.log("Pid:", pid);
      await addOrderItem(orderId, pid, item.quantity, item.price);
      console.log("Adding Order Item ->", {
        orderId,
        pid,
        quantity: item.quantity,
        price: item.price,
      });
    }

    alert("Order Confirmed successfully!");
    // clearCart(); // Uncomment this if you want to clear cart after order
    setOrderPlaced(true);
  } catch (error) {
    console.error("Order placement failed:", error);
    alert("Failed to place order.");
  }
};

  const handleAddAddressClick = () => {
    navigate("/address");
  };

  return (
    <div className="checkout-container">
      <h2>Your Order</h2>
      <div className="cart-table">
        <div className="cart-header">
          <div className="cart-col">Product</div>
          <div className="cart-col">Price</div>
          <div className="cart-col">Quantity</div>
          <div className="cart-col">Subtotal</div>
        </div>
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-col">{item.prodName}</div>
            <div className="cart-col">₹{item.price}</div>
            <div className="cart-col">{item.quantity}</div>
            <div className="cart-col">₹{item.price * item.quantity}</div>
          </div>
        ))}
      </div>

      <div className="checkout-summary">
        <div className="summary-item">
          <span>Total:</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="summary-item">
          <span>Delivery Charges:</span>
          <span>₹50</span>
        </div>
        <div className="summary-item">
          <span>Final Total:</span>
          <span>₹{subtotal + 50}</span>
        </div>
        <button className="checkout-btn" onClick={handlePlaceOrder}>
          Confirm your order
        </button>
      </div>

      {/* Show this only after order is placed */}
      {orderPlaced && (
        <div className="order-success">
          <h3>🎉 Order Confirmed!</h3>
          <p>Please add a delivery address to proceed.</p>
          <button className="checkout-btn" onClick={handleAddAddressClick}>
            Add Delivery Address
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
