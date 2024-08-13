import asyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/auth/user.model.js';
import generateToken from '../utils/generate.token.js';
import { setCookie, clearCookie } from '../utils/cookieUtils.js';

/**
 * @desc Register a new user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, profileImage, mobileNumber, address, gender } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    profileImage,
    mobileNumber,
    address,
    gender,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      mobileNumber: user.mobileNumber,
      address: user.address,
      gender: user.gender,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


// Request password reset
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('No user found with this email');
  }

  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash the token and set it to the user document
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();

  // Send email
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested a password reset. Please make a PUT request to: \n\n ${resetUrl}`;
  
  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message,
    });
    
    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(500);
    throw new Error('Email could not be sent');
  }
});

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  // Hash the token
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Find the user with the hashed token and ensure it has not expired
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired token');
  }

  // Set new password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  const token = generateToken(user._id);
  setCookie(res, token); // Set token in cookie

  res.status(200).json({
    message: 'Password has been reset',
    token,
  });
});

/**
 * @desc Authenticate a user
 * @route POST /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    setCookie(res, token); // Set token in cookie
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      mobileNumber: user.mobileNumber,
      address: user.address,
      gender: user.gender,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});


// Logout user and clear cookie
const logoutUser = asyncHandler(async (req, res) => {
  clearCookie(res); // Clear token from cookie
  res.json({ message: 'Logged out' });
});

/**
 * @desc Get user profile
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      mobileNumber: user.mobileNumber,
      address: user.address,
      gender: user.gender,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * @desc Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profileImage = req.body.profileImage || user.profileImage;
    user.mobileNumber = req.body.mobileNumber || user.mobileNumber;
    user.address = req.body.address || user.address;
    user.gender = req.body.gender || user.gender;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      mobileNumber: updatedUser.mobileNumber,
      address: updatedUser.address,
      gender: updatedUser.gender,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * @desc Delete user profile
 * @route DELETE /api/users/profile
 * @access Private
 */
const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { registerUser, forgotPassword, resetPassword, authUser, logoutUser, getUserProfile, updateUserProfile, deleteUserProfile };