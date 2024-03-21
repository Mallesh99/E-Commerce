const Coup = require("../models/couponModel");

const addCoupon = async (req, res) => {
  try {
    const newCoup = new Coup({
      ...req.body,
    });

    await newCoup.save();
    res.status(201).send(newCoup);
  } catch (error) {
    console.log({ error });
    res.status(400).send({ message: "error" });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coup.find({});
    res.status(200).send(coupons);
  } catch (error) {
    res.status(400).send(error);
  }
};

const searchCoupon = async (req, res) => {
  try {
    const coupon = await Coup.findOne({ couponCode: req.params.id });
    const date = new Date();
    // console.log(coupon, "NEW");
    if (coupon) {
      if (coupon.startDate <= date && coupon.endDate >= date) {
        res.status(200).send(coupon);
      } else {
        res.status(400).send("Not Valid Coupon Code");
      }
    } else {
      res.status(400).send("Not Valid Coupon Code");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateCoupon = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["couponCode", "startDate", "endDate", "discount"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    const coupon = await Coup.findOne({ _id: req.params.id });

    if (!coupon) {
      return res.status(404).send({ error: "not found" });
    }

    updates.forEach((update) => (coupon[update] = req.body[update]));
    await coupon.save();
    res.send(coupon);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const deletedCoupon = await Coup.findOneAndDelete({ _id: req.params.id });
    if (!deletedCoupon) {
      res.status(404).send({ error: "Coupon not found" });
    }
    res.send(deletedCoupon);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  addCoupon,
  getAllCoupons,
  searchCoupon,
  updateCoupon,
  deleteCoupon,
};
