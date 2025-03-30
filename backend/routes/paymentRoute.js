import express from 'express';
import { createPayment, updatePayment, cancelPayment, getAllPayments } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', createPayment);
router.put('/:id', updatePayment);
router.delete('/:id', cancelPayment);
router.get('/', getAllPayments);

export default router;