import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    default: new ObjectId(),
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
});

productSchema.index({ type: "text" });

export default mongoose.model("Product", productSchema);
