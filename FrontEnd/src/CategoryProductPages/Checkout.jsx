import { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from './CartContext';
import { createOrder, addOrderItem } from '../Apis/orderApi.api';
import { getProdIdByName } from '../Apis/productApi.api';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(50);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.userId;
  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setSubtotal(total);


    let delivery = 50;
    let disc = 0;

    if (total > 500 && total <= 1000) {
      delivery = 0;
    } else if (total > 1000 && total <= 1500) {
      delivery = 0;
      disc = 0.05 * total;
    } else if (total > 1500 && total <= 2500) {
      delivery = 0;
      disc = 0.10 * total;
    } else if (total > 2500) {
      delivery = 0;
      disc = 0.20 * total;
    }

    setDeliveryCharges(delivery);
    setDiscount(disc);
    setFinalTotal(total - disc + delivery);
  }, [cart]);

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    const status = "Pending";

    try {
      const orderResponse = await createOrder(userId, finalTotal, status);
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

        await addOrderItem(orderId, pid, item.quantity, item.price);
      }

      alert("Order Confirmed successfully!");
      setOrderPlaced(true);
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order.");
      setIsPlacingOrder(false);
    }
  };

  const getDiscountPercentage = () => {
  if (subtotal > 1000 && subtotal <= 1500) return 5;
  if (subtotal > 1500 && subtotal <= 2500) return 10;
  if (subtotal > 2500) return 20;
  return 0;
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
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Delivery Charges:</span>
          <span>₹{deliveryCharges.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Discount:</span>
          <span>
            - ₹{discount.toFixed(2)}{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>
              ({getDiscountPercentage()}% off)
            </span>
          </span>
        </div>

        <div className="summary-item">
          <strong>Final Total:</strong>
          <strong>₹{finalTotal.toFixed(2)}</strong>
        </div>

        <button
          className="checkout-btn"
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder || orderPlaced}
        >
          {isPlacingOrder ? "Placing Order..." : "Confirm your order"}
        </button>

      </div>

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
