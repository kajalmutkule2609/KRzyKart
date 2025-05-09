import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../Apis/userApi.api";
import { updateUser } from "../../Apis/userApi.api";
import './updateUser.css';

const UpdateUser = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});
    const [updatedData, setUpdatedData] = useState({
        fullName: '',
        contactNo: '',
        address: '',
    });
    const [error, setError] = useState(null);


  const handleVerify = (e) => {
    e.preventDefault();
    loginUser({ email, password })
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data);
          setUpdatedData({
            fullName: response.data.fullName || '',
            contactNo: response.data.contactNo || '',
            address: response.data.address || '',
          });
          setStep(2);
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        setError("Error verifying user");
      });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated data:', updatedData); // Log the request payload
    updateUser(email, updatedData)
        .then((response) => {
            console.log('Backend response:', response); // Log the backend response
            if (response.status === 200) {
                localStorage.setItem("userData", JSON.stringify(updatedData));
                alert("User Updated Successfully")
                navigate("/seller-dashboard");
            }
        })
        .catch((error) => {
            console.error('Error updating user:', error); // Log any errors
            if (error.response.status === 400) {
                setError("Error!! User not Updated!!");
            } else {
                setError("Error!! User not Updated!!");
            }
        });
};



  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  if (step === 1) {
    return (
      <div className='update-User'>
        <form onSubmit={handleVerify}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button type="submit">Verify</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="updateUserDiv">
      <form onSubmit={handleSubmit} className="updateUser">
        <h2 className="updateTitle">Update Account</h2>
        <label>Full Name:</label>
        <input className="ip" type="text" name="fullName" value={updatedData.fullName} onChange={handleChange} />
        <br />
        <label>Contact No:</label>
        <input className="ip" type="text" name="contactNo" value={updatedData.contactNo} onChange={handleChange} />
        <br />
        <label>Address:</label>
        <input className="ip" type="text" name="address" value={updatedData.address} onChange={handleChange} />
        <br />
        <button className="update-submit" type="submit">Update</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateUser;

