import express from 'express';
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole
} from '../controllers/role.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Protected routes
router.route('/')
  .post(protect, createRole)
  .get(protect, getRoles);

router.route('/:id')
  .get(protect, getRoleById)
  .put(protect, updateRole)
  .delete(protect, deleteRole);

export default router;
