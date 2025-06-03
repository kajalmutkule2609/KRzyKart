import React, { useEffect, useState } from 'react';
import {
  getAllOrders,
  getItemsByOrderId,
  getItemsByProdId
} from '/src/Apis/orderApi.api';
import './GetAllOrders.css';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showItemsPopup, setShowItemsPopup] = useState(false);

  useEffect(() => {
    getAllOrders()
      .then((res) => {
        console.log("Orders API response:", res.data);
        setOrders(res.data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const handleViewItems = async (orderId) => {
    try {
      const orderItemsRes = await getItemsByOrderId(orderId);
      const orderItems = orderItemsRes.data;

      const itemsWithNames = await Promise.all(
        orderItems.map(async (item) => {
          const prodRes = await getItemsByProdId(item.pid);
          const productData = prodRes.data[0]; // Assuming single product returned
          return {
            ...item,
            prodName: productData?.prodName || "Unknown"
          };
        })
      );

      setSelectedItems(itemsWithNames);
      setShowItemsPopup(true);
    } catch (err) {
      console.error("Error fetching items or product names:", err);
    }
  };

  return (
    <div className="all-orders-container">
      <h2>All Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>View Items</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.userId}</td>
              <td>{order.orderDate}</td>
              <td>{order.status}</td>
              <td>₹{order.total}</td>
              <td>
                <button onClick={() => handleViewItems(order.orderId)}>
                  View Products
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showItemsPopup && (
        <div className="popup-overlay" onClick={() => setShowItemsPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Ordered Products</h3>
            {selectedItems.length > 0 ? (
              <ul>
                {selectedItems.map((item, index) => (
                  <li key={index}>
                    <strong>Product:</strong> {item.prodName} | <strong>Quantity:</strong> {item.quantity} | <strong>Price:</strong> ₹{item.price}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items found for this order.</p>
            )}
            <button onClick={() => setShowItemsPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
