import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '/src/Apis/userApi.api.js';
import './DeleteAccount.css';

const DeleteAccount = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleProceed = () => {
        setStep(2);
    };

    const handleDeleteAccount = (e) => {
        e.preventDefault();
        if (!checked) {
            setError('Please confirm that you want to delete your account');
            return;
        }
        deleteUser(email) // Use the deleteUser function from userApi.js
            .then((response) => {
                localStorage.removeItem('userData');
                console.log(response);
                navigate('/login');
            })
            .catch((error) => {
                setError('Error deleting account');
                console.log(error);
            });
    };


    return (
        <div className='delete-account'>
            {step === 1 ? (
                <div>
                    <h2>Delete Account</h2>
                    <p>Warning: Deleting your account will result in the loss of all your data, including:</p>
                    <ul>
                        <li>All your products</li>
                        <li>All your orders</li>
                        <li>All your reviews</li>
                    </ul>
                    <p>Are you sure you want to delete your account?</p>
                    <button onClick={handleProceed}>Proceed</button>
                </div>
            ) : (
                <div>
                    <h2>Confirm Account Deletion</h2>
                    <form onSubmit={handleDeleteAccount}>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                        <label>I am sure I want to delete my account</label>
                        <br />
                        <button type="submit">Delete Account</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>
            )}
        </div>
    );
};

export default DeleteAccount;


