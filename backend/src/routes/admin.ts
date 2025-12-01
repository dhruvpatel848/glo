import express from 'express';
import {
  adminLogin,
  getDashboardStats,
  createAdminUser,
} from '../controllers/adminController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/login', adminLogin);
router.post('/create', createAdminUser); // Should be protected in production

// Protected routes
router.get('/dashboard', authMiddleware, adminMiddleware, getDashboardStats);

export default router;
