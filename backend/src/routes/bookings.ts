import express from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  createCODBooking,
} from '../controllers/bookingController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/', createBooking);
router.post('/cod', createCODBooking);

// Protected routes (admin only)
router.get('/', authMiddleware, adminMiddleware, getAllBookings);
router.get('/:id', authMiddleware, adminMiddleware, getBookingById);
router.put('/:id/status', authMiddleware, adminMiddleware, updateBookingStatus);

export default router;
