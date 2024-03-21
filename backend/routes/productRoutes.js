const express = require("express");

const {
  addProduct,
  getProducts,
  updateProduct,
  deleleProduct,
  getProduct,
} = require("../controllers/productController");

const router = express.Router();

const adminCheck = require("../middlewares/adminCheck");

const { upload } = require("../helpers/multerHelper");

router.post("/addProduct", adminCheck, upload.single("image"), addProduct);
router.get("/getAll", getProducts);
router.patch("/:id", adminCheck, updateProduct);
router.delete("/:id", adminCheck, deleleProduct);

router.get("/getProduct/:id", getProduct);

module.exports = router;
