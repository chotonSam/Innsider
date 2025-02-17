import mongoose, { Schema } from "mongoose";

import { ObjectId } from "mongodb";

const reviewSchema = new Schema({
  hotelId: {
    required: true,
    type: ObjectId,
  },
  userId: {
    required: true,
    type: ObjectId,
  },
  rating: {
    required: true,
    type: Number,
  },
  review: {
    required: true,
    type: String,
  },
});

export const reviewModel =
  mongoose.models.reviews ?? mongoose.model("reviews", reviewSchema);
