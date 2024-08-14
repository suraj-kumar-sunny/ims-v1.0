import express from 'express';
import { body } from 'express-validator';
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} from '../controllers/user.controller.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  asyncHandler(registerUser)
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  asyncHandler(loginUser)
);

router.post('/logout', asyncHandler(logoutUser));

router.post(
  '/forgotpassword',
  [body('email').isEmail().withMessage('Enter a valid email address')],
  asyncHandler(forgotPassword)
);

router.put(
  '/resetpassword/:token',
  [
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  asyncHandler(resetPassword)
);

export default router;
