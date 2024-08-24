import { body } from 'express-validator';

const userValidationRules = () => [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 1 }).withMessage('Name must be at least 1 character long'),
    body('gender')
        .notEmpty().withMessage('Gender is required')
        .isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
    body('mobile')
        .notEmpty().withMessage('Mobile is required')
        .isNumeric().withMessage('Mobile must be a number')
        .isLength({ min: 10, max: 15 }).withMessage('Mobile number must be between 10 and 15 digits'),
    body('email')
        .isEmail().withMessage('Valid email is required'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('dob')
        .optional().isDate().withMessage('Date of Birth must be a valid date'),
    body('address')
        .optional().isString().withMessage('Address must be a string'),
    body('profileImage')
        .optional().isString().withMessage('Profile Image must be a valid URL or path'),
    body('roleId')
        .optional().isMongoId().withMessage('Role ID must be a valid MongoDB ObjectId'),
    body('productId')
        .optional().isMongoId().withMessage('Product ID must be a valid MongoDB ObjectId'),
    body('expenceId')
        .optional().isMongoId().withMessage('Expense ID must be a valid MongoDB ObjectId'),
];

export default userValidationRules;
