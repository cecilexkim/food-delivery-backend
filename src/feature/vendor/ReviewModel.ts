// models/Vendor.ts
import mongoose, { Document, Schema } from 'mongoose';

import { OpeningHours, MenuCategory } from '@generated/graphql/types';

export interface IReview extends Document {
  user: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    user: { type: String, required: true },
    rating: { type: Number, required: true, index: true },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IReview>('Review', ReviewSchema);
