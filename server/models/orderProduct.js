import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const orderProductSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export { orderProductSchema };
