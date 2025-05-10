import axios from "axios";

const BASE_URL = "http://localhost:8080/ECommerceWebsite/Shipping";

export const createShipping = async (shippingData) => {
  const response = await axios.post(`${BASE_URL}/create`, shippingData);
  return response.data;
};

export const getShippingByOrderId = async (orderId) => {
  const response = await axios.get(`${BASE_URL}/getByOrderId/${orderId}`);
  return response.data;
};

export const updateEstimatedDate = async (shippingId, newDate) => {
  const response = await axios.put(`${BASE_URL}/updateEstimatedDate/${shippingId}`, newDate, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.data;
};

export const deleteShipping = async (shippingId) => {
  const response = await axios.delete(`${BASE_URL}/delete/${shippingId}`);
  return response.data;
};

export const getAllShippings = async () => {
  const response = await axios.get(`${BASE_URL}/getAll`);
  return response.data;
};
