import mongoose from 'mongoose';

const errorLogSchema = new mongoose.Schema(
  {
    errorMessage: {
      type: String,
      required: true,
    },
    stackTrace: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    url: {
      type: String,
    },
    method: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const ErrorLog = mongoose.model('ErrorLog', errorLogSchema);