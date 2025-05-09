import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { addAddress, deleteAddress, getAllAddressesByUserId } from "../Apis/addressApi.api";
import './Address.css';

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    addressType: "",
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.userId;
  
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchAddresses = async () => {
      const data = await getAllAddressesByUserId(userId);
      setAddresses(data);
    };
    fetchAddresses();
  }, [userId]);

  const handleAddAddress = async (e) => {
    e.preventDefault();

    if (addresses.length >= 3) {
      alert("You can only have a maximum of 3 addresses.");
      return;
    }

    const newAddress = { ...form, userId };
    const result = await addAddress(newAddress);
    console.log("Add Address:", result);
    setForm({
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
      addressType: "",
    });

    const updated = await getAllAddressesByUserId(userId);
    setAddresses(updated);
  };

  const handleDeleteAddress = async (addressId) => {
    const result = await deleteAddress(addressId);
    console.log("Delete Address:", result);
    const updated = await getAllAddressesByUserId(userId);
    setAddresses(updated);
  };

  // Handle selecting an address
  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  // Proceed to payment
  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      alert("Please select an address before proceeding to payment.");
      return;
    }

    // Navigate to the payment page
    navigate("/payment");
  };

  return (
    <div className="address-container">
      <h1>Manage Addresses</h1>
  
      <div className="address-section">
        {/* LEFT: Address List */}
        <div className="address-list-container">
          <h2>Your Addresses</h2>
          {addresses.length > 0 ? (
            <ul className="address-list">
              {addresses.map((address) => (
                <li
                  key={address.addressId}
                  className={`address-item ${selectedAddress?.addressId === address.addressId ? "selected" : ""}`}
                >
                  <strong>{address.name}</strong><br />
                  {address.addressLine1}, {address.addressLine2}<br />
                  {address.city}, {address.state}, {address.pinCode}<br />
                  {address.country} - <em>{address.addressType}</em><br />
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteAddress(address.addressId)}
                  >
                    Delete
                  </button>
                  <button
                    className="select-btn"
                    onClick={() => handleSelectAddress(address)}
                  >
                    {selectedAddress?.addressId === address.addressId ? "Selected" : "Select"}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No addresses found.</p>
          )}
        </div>
  
        {/* RIGHT: Form */}
        <div className="address-form-container">
          <h2>Add New Address</h2>
          <form className="address-form" onSubmit={handleAddAddress}>
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address Line 1"
              value={form.addressLine1}
              onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Address Line 2"
              value={form.addressLine2}
              onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="PIN Code"
              value={form.pinCode}
              onChange={(e) => setForm({ ...form, pinCode: e.target.value })}
            />
            <input
              type="text"
              placeholder="Country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              required
            />
            <select
              value={form.addressType}
              onChange={(e) => setForm({ ...form, addressType: e.target.value })}
            >
              <option value="">Select Address Type</option>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Other">Other</option>
            </select>
            <button type="submit" className="submit-btn">Add Address</button>
          </form>
        </div>
      </div>
  
      {/* Bottom button */}
      <button className="proceed-btn" onClick={handleProceedToPayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default Address;
