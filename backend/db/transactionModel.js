const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model.Transactions ||
  mongoose.model("Transactions", TransactionSchema);
