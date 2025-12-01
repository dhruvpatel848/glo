import express from 'express';
import {
  createPaymentOrder,
  verifyPayment,
  handlePaymentFailure,
} from '../controllers/paymentController';

const router = express.Router();

router.post('/create-order', createPaymentOrder);
router.post('/verify', verifyPayment);
router.post('/failure', handlePaymentFailure);

export default router;
