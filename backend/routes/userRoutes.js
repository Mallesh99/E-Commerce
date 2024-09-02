const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  blockUser,
} = require("../controllers/userController");

const router = express.Router();

const adminCheck = require("../middlewares/adminCheck");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getAll", adminCheck, getAllUsers);
router.patch("/:id", adminCheck, updateUser);
router.delete("/:id", adminCheck, deleteUser);
router.patch("/block/:id", adminCheck, blockUser);

module.exports = router;
