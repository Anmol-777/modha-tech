import mongoose from "mongoose";

const innovationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["patented", "pending"],
      default: "pending",
    },
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Innovation", innovationSchema);
