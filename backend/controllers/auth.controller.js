import User from '../models/auth/user.model.js';
import generateToken  from '../utils/generate.token.js';
import asyncHandler from '../utils/asyncHandler.js';
import { validationResult } from 'express-validator';

const registerUser = asyncHandler(async (req, res) => {
  const { name, gender, mobile, email, password, confirmPassword, companyName } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = new User({
    name,
    gender,
    mobile,
    email,
    password,
    company: {
      name: companyName,
      email,
      mobile
    }
  });

  await user.save();
  res.status(201).json({
    message: 'User registered successfully',
    token: generateToken(user._id),
  });
});

// Login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.cookie('token', generateToken(user._id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  res.status(200).json({
    message: 'Login successful',
    user,
  });
});

export {registerUser, loginUser}