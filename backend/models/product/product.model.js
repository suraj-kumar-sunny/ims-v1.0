import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    inventoryType: {
      type: String,
      enum: ['sale', 'purchase'],
      required: true,
    },
    saleDetails: {
      salePrice: {
        type: Number,
        min: 0,
      },
      saleDate: {
        type: Date,
      },
    },
    purchaseDetails: {
      purchasePrice: {
        type: Number,
        min: 0,
      },
      purchaseDate: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model('Product', productSchema);