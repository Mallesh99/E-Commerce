const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Methods",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  next();
});

app.use(express.json());
app.use("/images", express.static("images"));

const dbConnect = require("./models/dbConnect");
dbConnect();

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const couponRoutes = require("./routes/couponRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/admin", adminRoutes);
app.use("/coupons", couponRoutes);
app.use("/orders", orderRoutes);

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

// mongodb+srv://Mallesh:mallesh99@cluster0.laj77zn.mongodb.net/e-commerce?retryWrites=true&w=majority
