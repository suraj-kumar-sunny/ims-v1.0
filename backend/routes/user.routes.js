import express from 'express';
import { registerUser, authUser, getUserProfile, updateUserProfile, deleteUserProfile, forgotPassword, resetPassword } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/', registerUser);
router.post('/login', authUser);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);

// Protected routes
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile).delete(protect, deleteUserProfile);

export default router;
