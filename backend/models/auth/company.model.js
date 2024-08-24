import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  mobile: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: { type: String },
  companyLogo: { type: String },
  companyRegisterDate: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Company = mongoose.model('Company', companySchema);

export default Company;
