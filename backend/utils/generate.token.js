import jwt from 'jsonwebtoken';

/**
 * Generate a JSON Web Token (JWT)
 * @param {string} id - The ID of the user
 * @returns {string} - The generated token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expiration time (e.g., 30 days)
  });
};

export default generateToken;
