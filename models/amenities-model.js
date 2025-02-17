import mongoose, { Schema } from "mongoose";

const amenitiesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  instructions: {
    type: String,
  },
  hours: {
    type: String,
  },
});

export const amenitiesModel =
  mongoose.models.amenities ?? mongoose.model("amenities", amenitiesSchema);
