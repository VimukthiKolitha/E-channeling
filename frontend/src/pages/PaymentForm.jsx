import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PaymentForm.css'

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    amount: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/payment', formData);
      alert('Payment Successful!');
      console.log(response.data);
      setFormData({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        amount: '',
      });
      navigate('/payment-manager'); // Redirect to Payment Manager after successful payment
    } catch (error) {
      alert('Payment Failed!');
      console.error(error);
    }
  };

  return (
    <div className="payment-form-page">
      <h1>Payment Gateway</h1>
      <div className="form-container">
        <h2>Make a Payment</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cardHolder"
            placeholder="Card Holder"
            value={formData.cardHolder}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <button type="submit">Pay Now</button>
        </form>
        
      </div>
    </div>
  );
};

export default PaymentForm;