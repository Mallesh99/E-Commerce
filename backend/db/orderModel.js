const mongoose = require("mongoose");

const ObjectID = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
    },
    owner: {
      type: ObjectID,
      required: true,
      ref: "User",
    },
    items: [
      {
        id: {
          type: ObjectID,
          ref: "Item",
          required: true,
        },
        name: String,
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: Number,
        image: String,
        color: String,
        size: String,
      },
    ],
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    tax: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    grandtotal: {
      type: Number,
    },
    status: {
      type: String,
    },
    address: {
      type: String,
    },
    paymentType: {
      type: String,
    },
    paymentStatus: {
      type: String,
    },
    mobilenumber: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
