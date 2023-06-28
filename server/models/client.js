import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { clientOrderSchema } from "./clientOrder.js";

const clientSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    default: new ObjectId(),
  },
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: String,
  birthday: String,
  gender: Boolean,
  contacts: {
    phone: String,
    email: String,
  },
  orders: [clientOrderSchema],
});

export default mongoose.model("Client", clientSchema);
