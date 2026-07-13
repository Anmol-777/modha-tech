import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    section: { type: String, required: true },
    key: { type: String, required: true },
    value: { type: String, default: "" },
    type: { type: String, enum: ["text", "image"], default: "text" },
    label: { type: String, default: "" },
  },
  { timestamps: true }
);

contentSchema.index({ section: 1, key: 1 }, { unique: true });

export default mongoose.model("Content", contentSchema);
