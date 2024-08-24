import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  locality: { type: String },
  countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
  stateId: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  profileImage: { type: String },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  loginAt: { type: Date },
  logoutAt: { type: Date },
  lastLoginSession: { type: String },
  totalLoginSession: { type: Number, default: 0 },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  expenseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Expense' },
  company: {
    name: { type: String },
    email: { type: String },
    mobile: { type: String }
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
