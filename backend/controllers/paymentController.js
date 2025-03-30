import Payment from '../models/paymentModel.js';

// Create Payment
export const createPayment = async (req, res) => {
  try {
    const { cardNumber, cardHolder, expiryDate, cvv, amount } = req.body;
    const payment = new Payment({ cardNumber, cardHolder, expiryDate, cvv, amount });
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

// Update Payment
export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment' });
  }
};

// Cancel Payment
export const cancelPayment = async (req, res) => {
  try {
    const { id } = req.params;
    await Payment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Payment canceled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel payment' });
  }
};

// Get All Payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
};