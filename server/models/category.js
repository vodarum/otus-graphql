import { text } from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    default: new ObjectId(),
  },
  title: {
    type: String,
    required: true,
  },
  products: [ObjectId],
});

categorySchema.index({ title: "text" });

export default mongoose.model("Category", categorySchema);
