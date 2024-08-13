import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Protected routes
router.route('/')
  .post(protect, createCategory)
  .get(protect, getCategories);

router.route('/:id')
  .get(protect, getCategoryById)
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

export default router;
