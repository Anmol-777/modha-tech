import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true },
    author: String,
    product: String,
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
