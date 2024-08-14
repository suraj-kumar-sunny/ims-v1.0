import { Theme } from '../models/theme.model.js';
import asyncHandler from '../utils/asyncHandler.js';

// Update user theme
const updateUserTheme = asyncHandler(async (req, res) => {
  const { theme } = req.body;

  if (!['light', 'dark'].includes(theme)) {
    res.status(400);
    throw new Error('Invalid theme');
  }

  let userTheme = await Theme.findOne({ userId: req.user._id });

  if (userTheme) {
    userTheme.theme = theme;
  } else {
    userTheme = new Theme({
      userId: req.user._id,
      theme: theme,
    });
  }

  await userTheme.save();

  res.json({ theme: userTheme.theme });
});

// Get user theme
const getUserTheme = asyncHandler(async (req, res) => {
  const userTheme = await Theme.findOne({ userId: req.user._id });

  if (!userTheme) {
    return res.status(404).json({ message: 'Theme not found' });
  }

  res.json({ theme: userTheme.theme });
});

export {
  updateUserTheme,
  getUserTheme,
};
