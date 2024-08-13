import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Protected routes
router.route('/')
  .post(protect, createProduct)
  .get(protect, getProducts);

router.route('/:id')
  .get(protect, getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;
