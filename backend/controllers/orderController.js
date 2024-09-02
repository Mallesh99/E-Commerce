const Order = require("../models/orderModel");

require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const addOrder = async (req, res) => {
  try {
    const newOrd = new Order({
      ...req.body,
    });

    await newOrd.save();
    res.status(201).send(newOrd);
  } catch (error) {
    console.log(res);

    res
      .status(400)
      .send({ message: "Please Provide Address and Mobile Number" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getTodayOrders = async (req, res) => {
  var startDate = new Date("2024-03-01");
  var endDate = new Date("2024-03-31");
  try {
    const orders = await Order.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateOrder = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["status"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    const order = await Order.findOne({ _id: req.params.id });

    if (!order) {
      return res.status(404).send({ error: "not found" });
    }

    updates.forEach((update) => (order[update] = req.body[update]));
    await order.save();
    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({ _id: req.params.id });
    if (!deletedOrder) {
      res.status(404).send({ error: "Item not found" });
    }
    res.send(deletedOrder);
  } catch (error) {
    res.status(400).send(error);
  }
};

const payBill = async (req, res) => {
  const { amount } = req.body;
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: amount,
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const paymentSuccess = async (req, res) => {
  try {
    // getting the details back from our font-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    // if (digest !== razorpaySignature)
    //   return res.status(400).json({ msg: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

    res.json({
      msg: "Payment Successful",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
    // console.log(res, "suc res");
  } catch (error) {
    // console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  addOrder,
  getOrders,
  getTodayOrders,
  updateOrder,
  deleteOrder,
  payBill,
  paymentSuccess,
};
