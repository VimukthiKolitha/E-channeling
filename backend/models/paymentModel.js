import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  cardHolder: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Completed', 'Failed'] },
});

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;