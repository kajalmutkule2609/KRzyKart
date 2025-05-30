import axios from 'axios';

const API_URL = 'http://localhost:8080/ECommerceWebsite/User';
axios.defaults.withCredentials = true;
const registerUser = (userData) => {
    return axios.post(`${API_URL}/createUser`, userData);
};

const getUser = () => {
    return axios.post(`${API_URL}/getUser`,getUser);
};

const getUserByEmail = (email) => {
    return axios.get(`${API_URL}/SearchUserByEmail/${email}`);
  };
  
const loginUser = (formData) => {
    return axios.get(`${API_URL}/userLogin/${formData.email}/${formData.password}`);
};

const forgotPassword = (formData) => {
    return axios.put(`${API_URL}/changePassword/${formData.email}`, { password: formData.newPassword });
}

const deleteUser = (email) => {
    return axios.delete(`${API_URL}/deleteUser/${email}`);
  };
  
  const updateUser = (email, userData) => {
    return axios.put(`${API_URL}/updateUser/${email}`, userData);
  };
  

const generateOtp = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/generate-otp/${data.email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


 const getUserIdByEmail = (email) => {
    return axios.get(`${API_URL}/getUserIdByEmail/${email}`);
  };
  
const verifyOtp = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/verify-otp`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};



export { registerUser,getUser,getUserByEmail,loginUser,forgotPassword,generateOtp,verifyOtp,updateUser,deleteUser,getUserIdByEmail};