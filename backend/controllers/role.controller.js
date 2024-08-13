import asyncHandler from 'express-async-handler';
import { Role } from '../models/auth/role.model.js';

// Create a new role
const createRole = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Please provide a role name');
  }

  const role = new Role({ name });

  const createdRole = await role.save();
  res.status(201).json(createdRole);
});

// Get all roles
const getRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
});

// Get a single role by ID
const getRoleById = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    res.status(404);
    throw new Error('Role not found');
  }

  res.json(role);
});

// Update a role by ID
const updateRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    res.status(404);
    throw new Error('Role not found');
  }

  role.name = req.body.name || role.name;

  const updatedRole = await role.save();
  res.json(updatedRole);
});

// Delete a role by ID
const deleteRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    res.status(404);
    throw new Error('Role not found');
  }

  await role.remove();
  res.json({ message: 'Role removed' });
});

export { createRole, getRoles, getRoleById, updateRole, deleteRole };
