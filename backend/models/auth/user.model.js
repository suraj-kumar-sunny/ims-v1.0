import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function(v) {
        return /[A-Z]/.test(v) && /[a-z]/.test(v) && /[0-9]/.test(v);
      },
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    },
  },
  profileImage: {
    type: String,
    validate: {
      validator: function(v) {
        return validator.isURL(v) || validator.isFQDN(v);
      },
      message: 'Invalid profile image URL',
    },
  },
  mobileNumber: {
    type: String,
    validate: [validator.isMobilePhone, 'Please enter a valid mobile number'],
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  dateOfBirth: {
    type: Date,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true,
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', userSchema);