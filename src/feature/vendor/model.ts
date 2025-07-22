// models/Vendor.ts
import mongoose, { Schema, Document } from 'mongoose';

import { OpeningHours } from '@generated/graphql/types';

export interface IVendor extends Document {
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  cuisineType: string;
  deliveryFee: number;
  minOrder: number;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  address: string;
  isActive: boolean;
  openingHours: OpeningHours[];
}

const VendorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String, required: true },
    coverImage: { type: String, required: true },
    cuisineType: { type: String, required: true },
    deliveryFee: { type: Number, required: true },
    minOrder: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    deliveryTime: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    address: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    openingHours: [
      {
        day: { type: Number, required: true, min: 0, max: 6 },
        open: { type: String, required: true },
        close: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

VendorSchema.index({ location: '2dsphere' });

export default mongoose.model<IVendor>('Vendor', VendorSchema);
