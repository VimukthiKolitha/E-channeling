import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PaymentManager.css'

const PaymentManager = () => {
  const [payments, setPayments] = useState([]);
  const [editingPayment, setEditingPayment] = useState(null); // Track the payment being edited
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  // Fetch all payments from the backend
  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/payment');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  // Handle editing a payment
  const handleEdit = (payment) => {
    setEditingPayment(payment); // Set the payment to be edited
  };

  // Handle saving edited payment
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:4000/api/payment/${editingPayment._id}`, editingPayment);
      setEditingPayment(null); // Clear the editing state
      fetchPayments(); // Refresh the payment list
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  // Handle canceling a payment
  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/payment/${id}`);
      fetchPayments(); // Refresh the payment list
    } catch (error) {
      console.error('Error canceling payment:', error);
    }
  };

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingPayment({ ...editingPayment, [name]: value });
  };

  return (
    <div className="payment-manager-page">
      <h1>Payment Manager</h1>
      <div className="manager-container">
        <table>
          <thead>
            <tr>
              <th>Card Number</th>
              <th>Card Holder</th>
              <th>Expiry Date</th>
              <th>CVV</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                {editingPayment && editingPayment._id === payment._id ? (
                  // Edit mode
                  <>
                    <td>{payment.cardNumber}</td>
                    <td>{payment.cardHolder}</td>
                    <td>{payment.expiryDate}</td>
                    <td>{payment.cvv}</td>
                    <td>Rs {payment.amount}</td>
                    <td>
                      <select
                        name="status"
                        value={editingPayment.status}
                        onChange={handleInputChange}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </td>
                    <td>
                      <button className="save" onClick={handleSave}>
                        Save
                      </button>
                      <button className="cancel" onClick={() => setEditingPayment(null)}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  // View mode
                  <>
                    <td>{payment.cardNumber}</td>
                    <td>{payment.cardHolder}</td>
                    <td>{payment.expiryDate}</td>
                    <td>{payment.cvv}</td>
                    <td>Rs {payment.amount}</td>
                    <td>{payment.status}</td>
                    <td>
                      <button className="edit" onClick={() => handleEdit(payment)}>
                        Edit
                      </button>
                      <button className="cancel" onClick={() => handleCancel(payment._id)}>
                        Cancel
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default PaymentManager;