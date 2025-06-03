import axios from "axios";

const API_URL = "http://localhost:8080/ECommerceWebsite/Order";
export const createOrder = async (userId, total, status) => {
    try {
      const response = await fetch(`${API_URL}/createOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, total, status }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
  
      const responseData = await response.json();
      console.log("Response Data:", responseData);  
  
      if (responseData && responseData.orderId) {
        console.log('Order created successfully, Order ID:', responseData.orderId);
        return responseData;  
      } else {
        throw new Error('Order ID not returned in response');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };
  
// 2. Get Order by Order ID
export const getOrderById = (orderId) => {
  return axios.get(`${API_URL}/getOrderById/${orderId}`);
};

// 3. Get All Orders by User ID
export const getAllOrdersByUserId = (userId) => {
  return axios.get(`${API_URL}/getAllOrdersByUserId/${userId}`);
};

// 4. Update Order Status
export const updateOrderStatus = (orderId, status) => {
  return axios.put(`${API_URL}/updateOrderStatus/${orderId}`, { status });
};

// 5. Cancel Order
export const cancelOrder = (orderId) => {
  return axios.delete(`${API_URL}/cancelOrder/${orderId}`);
};

// 6. Get All Orders (admin)
export const getAllOrders = () => {
  return axios.get(`${API_URL}/getAllOrders`);
};

// 7. Add Order Item
export const addOrderItem = async (orderId, pid, quantity, price) => {
  try {
    const response = await fetch(`${API_URL}/addOrderItems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orderId, pid, quantity, price })
    });

    if (!response.ok) {
      throw new Error("Failed to add order item");
    }

    return await response.text(); 
  } catch (error) {
    console.error("Error adding order item:", error);
    throw error;
  }
};

// 8. Get Items by Order ID
export const getItemsByOrderId = (orderId) => {
  return axios.get(`${API_URL}/getItemsByOrderId/${orderId}`);
};

// 9. Update Item Quantity
export const updateItemQuantity = (itemId, quantity) => {
  return axios.put(`${API_URL}/updateItemQuantity/${itemId}`, { quantity });
};

// 10. Remove Item from Order
export const removeItemFromOrder = (itemId) => {
  return axios.delete(`${API_URL}/removeItemFromOrder/${itemId}`);
};
export const getOrderTotal = async (orderId) => {
  const response = await fetch(`${API_URL}/order-total/${orderId}`);
  const data = await response.json();
  return data;
};

export const getItemsByProdId = (prodId) => {
  return axios.get(`${API_URL}/getItemsByProdId/${prodId}`);
};