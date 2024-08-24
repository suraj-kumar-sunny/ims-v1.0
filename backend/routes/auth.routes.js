import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { body } from 'express-validator';

const authRouter = express.Router();

// Register route
authRouter.post('/register', [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirmPassword').not().isEmpty().withMessage('Confirm password is required'),
  body('companyName').not().isEmpty().withMessage('Company name is required'),
], registerUser);

// Login route
authRouter.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], loginUser);

export default authRouter;
