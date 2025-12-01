import express from 'express';
import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from '../controllers/locationController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getAllLocations);
router.get('/:id', getLocationById);

// Protected routes (admin only)
router.post('/', authMiddleware, adminMiddleware, createLocation);
router.put('/:id', authMiddleware, adminMiddleware, updateLocation);
router.delete('/:id', authMiddleware, adminMiddleware, deleteLocation);

export default router;
