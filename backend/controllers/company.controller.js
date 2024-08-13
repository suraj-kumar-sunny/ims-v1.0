import asyncHandler from 'express-async-handler';
import { Company } from '../models/product/company.model.js';

// Create a new company
const createCompany = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Please provide a company name');
  }

  const company = new Company({ name });

  const createdCompany = await company.save();
  res.status(201).json(createdCompany);
});

// Get all companies
const getCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

// Get a single company by ID
const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    res.status(404);
    throw new Error('Company not found');
  }

  res.json(company);
});

// Update a company by ID
const updateCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    res.status(404);
    throw new Error('Company not found');
  }

  company.name = req.body.name || company.name;

  const updatedCompany = await company.save();
  res.json(updatedCompany);
});

// Delete a company by ID
const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    res.status(404);
    throw new Error('Company not found');
  }

  await company.remove();
  res.json({ message: 'Company removed' });
});

export { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany };
