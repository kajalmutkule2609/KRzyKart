const BASE_URL = "http://localhost:8080/ECommerceWebsite/Address";

const addAddress = async (addressData) => {
  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressData),
    });

    return response.ok ? "Address Added" : "Failed to add address";
  } catch (error) {
    console.error("Error adding address:", error);
    return "Failed to add address";
  }
};

const updateAddress = async (addressId, addressData) => {
  try {
    const response = await fetch(`${BASE_URL}/update/${addressId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressData),
    });

    return response.ok ? "Address Updated" : "Update Failed";
  } catch (error) {
    console.error("Error updating address:", error);
    return "Update Failed";
  }
};

const deleteAddress = async (addressId) => {
  try {
    const response = await fetch(`${BASE_URL}/delete/${addressId}`, {
      method: "DELETE",
    });

    return response.ok ? "Address Deleted" : "Delete Failed";
  } catch (error) {
    console.error("Error deleting address:", error);
    return "Delete Failed";
  }
};

const getAddressById = async (addressId) => {
  try {
    const response = await fetch(`${BASE_URL}/getById/${addressId}`);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching address by ID:", error);
    return null;
  }
};

const getAllAddressesByUserId = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/getAllByUserId/${userId}`);

    if (!response.ok) return [];

    const text = await response.text();
    if (!text) return [];

    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching all addresses by user ID:", error);
    return [];
  }
};

export {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddressById,
  getAllAddressesByUserId,
};
