import asyncHandler from 'express-async-handler';
import { ProductCategory } from '../models/product/productCategory.model.js';

// Create a new category
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Please provide a category name');
  }

  const category = new ProductCategory({ name });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// Get all categories
const getCategories = asyncHandler(async (req, res) => {
  const categories = await ProductCategory.find();
  res.json(categories);
});

// Get a single category by ID
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await ProductCategory.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.json(category);
});

// Update a category by ID
const updateCategory = asyncHandler(async (req, res) => {
  const category = await ProductCategory.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  category.name = req.body.name || category.name;

  const updatedCategory = await category.save();
  res.json(updatedCategory);
});

// Delete a category by ID
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await ProductCategory.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  await category.remove();
  res.json({ message: 'Category removed' });
});

export { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };
