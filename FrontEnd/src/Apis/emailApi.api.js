import axios from "axios";

export const sendReceipt = (emailData) => {
  return axios.post("http://localhost:8080/ECommerceWebsite/Email/send", emailData);
};
