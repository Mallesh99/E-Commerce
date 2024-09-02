const express = require("express");
const {
  addCoupon,
  getAllCoupons,
  searchCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

const adminCheck = require("../middlewares/adminCheck");
const userCheck = require("../middlewares/userCheck");

const router = express.Router();

router.post("/addCoupon", adminCheck, addCoupon);
router.get("/getAll", adminCheck, getAllCoupons);
router.get("/getcoupon/:id", userCheck, searchCoupon);
router.patch("/:id", adminCheck, updateCoupon);
router.delete("/:id", adminCheck, deleteCoupon);

module.exports = router;
