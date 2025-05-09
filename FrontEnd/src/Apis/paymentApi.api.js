import axios from 'axios';

const API_URL = "http://localhost:8080/ECommerceWebsite/Payment";  
export const createPayment = async (paymentData) => {
  try {
    const response = await axios.post(
      `${API_URL}/create`,
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Payment created successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};


// Get Payment by Order ID
export const getPaymentByOrderId = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/getByOrderId/${orderId}`);
    return response.data;  // Returns the payment details or no content
  } catch (error) {
    console.error(`Error fetching payment for order ${orderId}:`, error);
    throw error;
  }
};

// Update Payment Method
export const updatePaymentMethod = async (paymentId, newMethod) => {
  try {
    const response = await axios.put(`${API_URL}/updateMethod/${paymentId}`, newMethod, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;  // Returns success message
  } catch (error) {
    console.error(`Error updating payment method for paymentId ${paymentId}:`, error);
    throw error;
  }
};

// Delete Payment
export const deletePayment = async (paymentId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${paymentId}`);
    return response.data;  // Returns success message or error
  } catch (error) {
    console.error(`Error deleting payment with paymentId ${paymentId}:`, error);
    throw error;
  }
};

// Get All Payments
export const getAllPayments = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAll`);
    return response.data;  
  } catch (error) {
    console.error("Error fetching all payments:", error);
    throw error;
  }
};
