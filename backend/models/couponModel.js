const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
  },

  endDate: {
    type: Date,
  },

  discount: {
    type: Number,
  },
});

module.exports = mongoose.model.Coup || mongoose.model("Coup", CouponSchema);
