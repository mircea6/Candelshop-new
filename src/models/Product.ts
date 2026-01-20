import mongoose, { Schema, Document, Model } from 'mongoose';
import type { Product } from '@/types/Product';

export interface IProduct extends Omit<Product, 'id'>, Document {
  // _id este deja definit în Document ca ObjectId
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Numele produsului este obligatoriu'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Prețul este obligatoriu'],
      min: [0, 'Prețul nu poate fi negativ'],
    },
    currency: {
      type: String,
      default: 'RON',
      enum: ['RON'],
    },
    scent: {
      type: String,
      required: [true, 'Aroma este obligatorie'],
      trim: true,
    },
    wax: {
      type: String,
      required: [true, 'Tipul de ceară este obligatoriu'],
      enum: ['soia', 'rapita', 'cocos'],
    },
    burnTimeHours: {
      type: Number,
      required: [true, 'Timpul de ardere este obligatoriu'],
      min: [0, 'Timpul de ardere nu poate fi negativ'],
    },
    sizeGrams: {
      type: Number,
      required: [true, 'Greutatea este obligatorie'],
      min: [0, 'Greutatea nu poate fi negativă'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Descrierea este obligatorie'],
      trim: true,
    },
    createdAt: {
      type: String,
      default: () => new Date().toISOString(),
    },
  },
  {
    timestamps: false, // Folosim createdAt manual
  }
);

const ProductModel: Model<IProduct> = 
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default ProductModel;