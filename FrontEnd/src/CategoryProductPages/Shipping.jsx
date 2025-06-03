import React, { useEffect, useState } from "react";
import { sendReceipt } from "../Apis/emailApi.api";
import {
  getShippingByOrderId,
} from "../Apis/shippingApi.api";
import {
  getOrderById,
  getItemsByOrderId,
} from "../Apis/orderApi.api";
import {
  getPaymentByOrderId,
} from "../Apis/paymentApi.api";
import {
  getProductNameById,
} from "../Apis/productApi.api"; 

import "./Shipping.css";

const ShippingPage = () => {
  const [orderId, setOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [shippingDetails, setShippingDetails] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);

  useEffect(() => {
    const storedOrderId = localStorage.getItem("currentOrderId");
    const selectedAddress = localStorage.getItem("selectedAddress");
    if (!storedOrderId) return;

    setOrderId(parseInt(storedOrderId));

    if (selectedAddress) {
      try {
        setShippingAddress(JSON.parse(selectedAddress));
      } catch {
        setShippingAddress(null);
      }
    }

    const fetchData = async () => {
      try {
        const [orderRes, itemsRes, paymentRes, shippingRes] = await Promise.all([
          getOrderById(storedOrderId),
          getItemsByOrderId(storedOrderId),
          getPaymentByOrderId(storedOrderId),
          getShippingByOrderId(storedOrderId),
        ]);

        setOrderDetails(orderRes.data);
        setPaymentDetails(paymentRes);
        setShippingDetails(shippingRes);

        
        const itemsWithNames = await Promise.all(
          itemsRes.data.map(async (item) => {
            const productName = await getProductNameById(item.pid); 
            return {
              ...item,
              productName: productName || "Unknown Product",
            };
          })
        );

        setOrderItems(itemsWithNames);
      } catch (error) {
        console.error("Failed to fetch details:", error);
        alert("Could not fetch shipping information.");
      }
    };

    fetchData();
  }, []);
  
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userEmail = userData?.email;
   console.log("Email:",userEmail);
const handleSendEmail = async () => {
  if (!userEmail) {
    alert("User email not found in localStorage.");
    return;
  }

  const emailData = {
    to: userEmail,
    subject: `Your Order Receipt - Order #${orderId}`,
    body: `
Thank you for shopping with KRzyKart!

Order ID: ${orderDetails.orderId}
Total Amount: ₹${paymentDetails.amount}
Payment Method: ${paymentDetails.paymentMethod}
Payment Date: ${paymentDetails.paymentDate}

Shipping Date: ${shippingDetails.shippingDate}
Estimated Delivery: ${shippingDetails.estimatedDeliveryDate}

Items:
${orderItems.map(item => `• ${item.productName} x${item.quantity} - ₹${item.price}`).join("\n")}



We hope to see you again soon!
      `
  };

  try {
    await sendReceipt(emailData);
    alert("Receipt sent successfully to your email!");
  } catch (error) {
    console.error("Failed to send email:", error);
    alert("Error sending receipt. Please try again.");
  }
};

  return (
    <div className="shipping-page">
      <h2>Shipping Summary for Order #{orderId}</h2>

      {orderDetails && (
        <div className="section">
          <h3>Order Details</h3>
          <table>
            <tbody>
              <tr><th>Order ID</th><td>{orderDetails.orderId}</td></tr>
              <tr><th>User ID</th><td>{orderDetails.userId}</td></tr>
              <tr><th>Total Amount</th><td>₹{paymentDetails.amount}</td></tr>
              <tr><th>Order Date</th><td>{orderDetails.orderDate}</td></tr>
            </tbody>
          </table>
        </div>
      )}

      {orderItems.length > 0 && (
        <div className="section">
          <h3>Order Items</h3>
          <table>
            <thead>
              <tr><th>Product</th><th>Qty</th><th>Price</th></tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {paymentDetails && (
        <div className="section">
          <h3>Payment Info</h3>
          <table>
            <tbody>
              <tr><th>Payment Method</th><td>{paymentDetails.paymentMethod}</td></tr>
              <tr><th>Payment Date</th><td>{paymentDetails.paymentDate}</td></tr>
              <tr><th>Amount Paid</th><td>₹{paymentDetails.amount}</td></tr>
            </tbody>
          </table>
        </div>
      )}

      {shippingDetails && (
        <div className="section">
          <h3>Shipping Info</h3>
          <table>
            <tbody>
              <tr><th>Shipping Date</th><td>{shippingDetails.shippingDate}</td></tr>
              <tr><th>Estimated Delivery</th><td>{shippingDetails.estimatedDeliveryDate}</td></tr>
            </tbody>
          </table>
        </div>
      )}

      {shippingAddress && (
        <div className="section">
          <h3>Shipping Address</h3>
          <table>
            <tbody>
              <tr><th>Name</th><td>{shippingAddress.name}</td></tr>
              <tr><th>Address</th><td>{shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.zip}</td></tr>
              <tr><th>Phone</th><td>{shippingAddress.phone}</td></tr>
            </tbody>
          </table>
        </div>
      )}
      {/* {orderDetails && shippingAddress && paymentDetails && orderItems.length > 0 && ( */}
  <div className="section">
    <button className="sendEmail"
      onClick={handleSendEmail}
    >
      Send Receipt to Email
    </button>
  </div>
{/* )} */}

    </div>
  );
};

export default ShippingPage;
