const Item = require("../models/itemModel");

const addProduct = async (req, res) => {
  try {
    // console.log(req.body);
    const newItem = new Item({
      ...req.body,
      image: `http://192.168.50.131:8000/images/${req.file.originalname}`,
    });

    // console.log(newItem.image);

    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    console.log({ error });
    res.status(400).send({ message: "error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateProduct = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "description",
    "category",
    "price",
    "sizes",
    "colors",
    "discount",
  ];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    const item = await Item.findOne({ _id: req.params.id });

    if (!item) {
      return res.status(404).send({ error: "not found" });
    }

    updates.forEach((update) => (item[update] = req.body[update]));
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleleProduct = async (req, res) => {
  try {
    const deletedItem = await Item.findOneAndDelete({ _id: req.params.id });
    if (!deletedItem) {
      res.status(404).send({ error: "Item not found" });
    }
    res.send(deletedItem);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  addProduct,
  getProduct,
  getProducts,
  deleleProduct,
  updateProduct,
};
