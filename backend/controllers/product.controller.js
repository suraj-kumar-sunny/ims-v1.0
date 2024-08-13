import asyncHandler from '../utils/asyncHandler.js';
import { Product } from '../models/product/product.model.js';

// Create a new product
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, company, category, productCode, isForSale, isForPurchase } = req.body;

  if (!name || !price || !company || !category || !productCode) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const product = new Product({
    name,
    price,
    company,
    category,
    productCode,
    isForSale,
    isForPurchase,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get a single product by ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

// Update a product by ID
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, company, category, productCode, isForSale, isForPurchase } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.name = name || product.name;
  product.price = price || product.price;
  product.company = company || product.company;
  product.category = category || product.category;
  product.productCode = productCode || product.productCode;
  product.isForSale = isForSale || product.isForSale;
  product.isForPurchase = isForPurchase || product.isForPurchase;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// Delete a product by ID
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.remove();
  res.json({ message: 'Product removed' });
});

export { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
