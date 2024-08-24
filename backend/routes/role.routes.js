import express from 'express';
import { registerUser } from '../controllers/userController.js';
import userValidationRules from '../validators/userValidator.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post('/register', userValidationRules(), validate, registerUser);

export default router;
