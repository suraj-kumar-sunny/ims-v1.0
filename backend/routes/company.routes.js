import express from 'express';
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
} from '../controllers/company.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Protected routes
router.route('/')
  .post(protect, createCompany)
  .get(protect, getCompanies);

router.route('/:id')
  .get(protect, getCompanyById)
  .put(protect, updateCompany)
  .delete(protect, deleteCompany);

export default router;
