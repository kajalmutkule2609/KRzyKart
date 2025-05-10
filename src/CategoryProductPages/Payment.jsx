import React, { useEffect, useState,useContext } from "react";
import { createPayment } from "../Apis/paymentApi.api";
import { getOrderTotal } from "../Apis/orderApi.api";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { createShipping } from "../Apis/shippingApi.api";
import "./Payment.css";

const Payment = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState("UPI");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrderId = localStorage.getItem("currentOrderId");
    console.log("Orderid in Payment Component:", storedOrderId);
    if (!storedOrderId) {
      alert("No order found. Please place an order first.");
      navigate("/checkout");
      return;
    }

    setOrderId(parseInt(storedOrderId));
    setDate(new Date().toISOString());

    const fetchAmount = async () => {
      try {
        const total = await getOrderTotal(storedOrderId);
        setAmount(total);
      } catch (error) {
        console.error("Failed to fetch order total:", error);
        alert("Could not fetch order amount.");
      }
    };

    fetchAmount();
  }, [navigate]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const paymentData = {
      orderId: parseInt(orderId),
      paymentMethod: method,
      paymentDate: date,
      amount: parseFloat(amount),
    };

    await createPayment(paymentData);

    
    const shippingDate = new Date().toISOString().split("T")[0]; 
    const estimatedDeliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) 
      .toISOString()
      .split("T")[0];

    const shippingData = {
      orderId: parseInt(orderId),
      shippingDate,
      esitamedDeliveryDate: estimatedDeliveryDate,
    };

    await createShipping(shippingData);

    clearCart();
    alert("Payment successful!");
    navigate("/shipping");

  } catch (error) {
    console.error("Payment failed:", error);
    alert("Payment or Shipping failed. Please try again.");
  }
};


  return (
    <div className="payment-container">
      <h2>Confirm Payment Details</h2>
      <table className="payment-table">
        <tbody>
          <tr>
            <th>Order ID</th>
            <td>{orderId}</td>
          </tr>
          <tr>
            <th>Total Amount</th>
            <td>₹{amount}</td>
          </tr>
          <tr>
            <th>Payment Method</th>
            <td>
              <select className="select" value={method} onChange={(e) => setMethod(e.target.value)}>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="NetBanking">NetBanking</option>
                <option value="COD">Cash on Delivery</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>Date & Time</th>
            <td>{date}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={handleSubmit} className="submit-btn">Submit Payment</button>
    </div>
  );
};

export default Payment;
