import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { orderProductSchema } from "./orderProduct.js";

const orderSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    default: new ObjectId(),
  },
  client: {
    type: ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  products: {
    type: [orderProductSchema],
    required: true,
    validate: {
      validator: function (v) {
        return v.length !== 0;
      },
      message: (props) => `Выберите товар!`,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        switch (v) {
          case "Наличные":
          case "Банковская карта":
          case "Оплата онлайн":
            return true;

          default:
            return false;
        }
      },
      message: (props) => `Способ оплаты "${props.value}" не доступен!`,
    },
  },
  receivingMethod: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        switch (v) {
          case "Доставка":
          case "Самовывоз":
            return true;

          default:
            return false;
        }
      },
      message: (props) => `Способ получения "${props.value}" не доступен!`,
    },
  },
  total: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: (props) => `Сумма должна быть больше 0!`,
    },
  },
});

export default mongoose.model("Order", orderSchema);
