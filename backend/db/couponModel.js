const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
  couponcode: {
    type: String,
    required: true,
  },

  startdate: {
    type: Date,
  },

  enddate: {
    type: Date,
  },

  discount: {
    type: Number,
  },

  status: {
    type: String,
  },
});

module.exports = mongoose.model.Coup || mongoose.model("Coup", CouponSchema);
