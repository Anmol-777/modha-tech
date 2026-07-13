import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    shortDescription: String,
    description: String,
    features: [String],
    dimensions: String,
    rating: { type: Number, default: 4.5 },
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
