const express = require("express");
const {
  addOrder,
  getOrders,
  getTodayOrders,
  updateOrder,
  deleteOrder,
  payBill,
  paymentSuccess,
} = require("../controllers/orderController");

const router = express.Router();

const adminCheck = require("../middlewares/adminCheck");
const userCheck = require("../middlewares/userCheck");

router.get("/getAll", adminCheck, getOrders);
router.post("/create", userCheck, addOrder);
router.get("/today", adminCheck, getTodayOrders);
router.patch("/:id", adminCheck, updateOrder);
router.delete("/:id", adminCheck, deleteOrder);
router.post("/payment", userCheck, payBill);
router.post("/payment/success", userCheck, paymentSuccess);

module.exports = router;
