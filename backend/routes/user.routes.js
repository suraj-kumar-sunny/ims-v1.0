import express from 'express';
import { getUsers, getUserById } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.get('/', authMiddleware, getUsers);
userRouter.get('/:id', authMiddleware, getUserById);

export default userRouter;
