import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { orderProductSchema } from "./orderProduct.js";

const clientOrderSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  products: {
    type: [orderProductSchema],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

export { clientOrderSchema };
