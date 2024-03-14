const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

const dbConnect = require("./db/dbConnect");
dbConnect();

const bcrypt = require("bcrypt");
const User = require("./db/userModel");

const jwt = require("jsonwebtoken");

// multer configuration
const multer = require("multer");
//Setting storage engine
const storageEngine = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

const path = require("path");

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg|webp/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};
app.post("/single", upload.single("image"), (req, res) => {
  // console.log(req);
  if (req.file) {
    console.log(res);
    res.send("Single file uploaded successfully");
  } else {
    res.status(400).send("Please upload a valid image");
  }
});
//multer end

//start

const Admin = require("./db/adminModel");
const Item = require("./db/itemModel");

app.post("/items", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
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
});

//add item endpoint

// app.post("/items", upload.single("image"), async (req, res) => {
//   try {
//     // console.log(req);
//     const newItem = new Item({
//       ...req.body,
//       image: `http://192.168.50.131:8000/images/${req.file.originalname}`,
//     });

//     // console.log(newItem.image);

//     await newItem.save();
//     res.status(201).send(newItem);
//   } catch (error) {
//     console.log({ error });
//     res.status(400).send({ message: "error" });
//   }
// });

// register endpoint Admin
app.post("/registerAdmin", (request, response) => {
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      const admin = new Admin({
        email: request.body.email,
        password: hashedPassword,
      });

      admin
        .save()
        .then((result) => {
          response.status(201).send({
            message: "Admin Created Successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Error creating admin",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint Admin

app.post("/loginAdmin", (request, response) => {
  Admin.findOne({ email: request.body.email })
    .then((admin) => {
      bcrypt
        .compare(request.body.password, admin.password)

        .then((passwordCheck) => {
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          const token = jwt.sign(
            {
              adminId: admin._id,
              adminEmail: admin.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          ); //imp

          response.status(200).send({
            message: "Login Successful",
            email: admin.email,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

//read items end point
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
});

//read orders end point
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send(error);
  }
});
//read coupons end point
app.get("/coupons", async (req, res) => {
  try {
    const coupons = await Coup.find({});
    res.status(200).send(coupons);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get today orders
app.get("/orders/today", async (req, res) => {
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
});
//get discount coupon
app.get("/getcoupon/:id", async (req, res) => {
  try {
    const coupon = await Coup.findOne({ couponcode: req.params.id });
    const date = new Date();
    // console.log(coupon, "NEW");
    if (coupon) {
      if (coupon.startdate <= date && coupon.enddate >= date) {
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
});

// for users manipulation endpoints
app.get("/users", async (req, res) => {
  try {
    const items = await User.find({});
    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
});
//read product end point
app.get("/:id", async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.get("/categorypage/:id", async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

//end

// const routes = require("./");
// app.use("/api", routes);

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// register endpoint
app.post("/register", (request, response) => {
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        fullname: request.body.fullname,
        email: request.body.email,
        password: hashedPassword,
      });

      user
        .save()
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint

app.post("/login", (request, response) => {
  User.findOne({ email: request.body.email })
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)

        .then((passwordCheck) => {
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          ); //imp

          response.status(200).send({
            fullname: user.fullname,
            message: "Login Successful",
            email: user.email,
            id: user._id,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

//update an item

app.patch("/items/:id", async (req, res) => {
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
});

//delete item
app.delete("/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findOneAndDelete({ _id: req.params.id });
    if (!deletedItem) {
      res.status(404).send({ error: "Item not found" });
    }
    res.send(deletedItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

// update user email end point

app.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["email"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).send({ error: "not found" });
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
// update coupon end point

app.patch("/coupons/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["couponcode", "startdate", "enddate", "discount"];

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
});

//delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
    if (!deletedUser) {
      res.status(404).send({ error: "User not found" });
    }
    res.send(deletedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});
//delete coupon
app.delete("/coupons/:id", async (req, res) => {
  try {
    const deletedCoupon = await Coup.findOneAndDelete({ _id: req.params.id });
    if (!deletedCoupon) {
      res.status(404).send({ error: "Coupon not found" });
    }
    res.send(deletedCoupon);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Cart End Points Start

const Cart = require("./db/cartModel");
const { error } = require("console");

//create cart

// app.post("/cart", async (req, res) => {
//   // console.log(req);
//   // const user = req.user_id;

//   const { owner, itemId, quantity, color, size } = req.body;
//   try {
//     const cart = await Cart.findOne({ owner });
//     const item = await Item.findOne({ _id: itemId });
//     if (!item) {
//       res.status(404).send({ message: "item not found" });
//       return;
//     }
//     const price = item.price;
//     const name = item.name;
//     const image = item.image;
//     //If cart already exists for user,
//     if (cart) {
//       const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
//       //check if product exists or not
//       if (itemIndex > -1) {
//         let product = cart.items[itemIndex];
//         product.quantity = quantity;
//         cart.bill = cart.items.reduce((acc, curr) => {
//           return acc + curr.quantity * curr.price;
//         }, 0);
//         cart.items[itemIndex] = product;
//         await cart.save();
//         res.status(200).send(cart);
//       } else {
//         cart.items.push({ itemId, name, quantity, price, image, color, size });
//         cart.bill = cart.items.reduce((acc, curr) => {
//           return acc + curr.quantity * curr.price;
//         }, 0);
//         await cart.save();
//         res.status(200).send(cart);
//       }
//     } else {
//       //no cart exists, create one
//       const newCart = await Cart.create({
//         owner,
//         items: [{ itemId, name, quantity, price, image, color, size }],
//         bill: quantity * price,
//       });
//       return res.status(201).send(newCart);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("something went wrong");
//   }
// });

// get cart
app.get("/cart/:id", async (req, res) => {
  // console.log(req);
  try {
    const cart = await Cart.findOne({ owner: req.params.id });
    if (cart != null) {
      res.status(200).send(cart);
    } else {
      console.log("else");
      res.send(null);
    }
  } catch (error) {
    res.status(500).send();
  }
});

app.delete("/cart/:id/", async (req, res) => {
  const owner = req.params.id;
  const itemId = req.query.itemId;
  // console.log(itemId);
  try {
    let cart = await Cart.findOne({ owner });
    const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
    if (itemIndex > -1) {
      let item = cart.items[itemIndex];
      cart.bill -= item.quantity * item.price;
      if (cart.bill < 0) {
        cart.bill = 0;
      }
      cart.items.splice(itemIndex, 1);
      cart.bill = cart.items.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);
      cart = await cart.save();
      res.status(200).send(cart);
    } else {
      res.status(404).send("item not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

//for coupons

const Coup = require("./db/couponModel");
const Order = require("./db/orderModel");

app.post("/coupons", async (req, res) => {
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
});

//add order endpoint
app.post("/orders", async (req, res) => {
  try {
    const newOrd = new Order({
      ...req.body,
    });

    await newOrd.save();
    res.status(201).send(newOrd);
  } catch (error) {
    console.log({ error });
    res.status(400).send({ message: "error" });
  }
});

//update an order

app.patch("/orders/:id", async (req, res) => {
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
});

// delete order
app.delete("/orders/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({ _id: req.params.id });
    if (!deletedOrder) {
      res.status(404).send({ error: "Item not found" });
    }
    res.send(deletedOrder);
  } catch (error) {
    res.status(400).send(error);
  }
});

//cart using redux

// app.post("/cart", async (req, res) => {
//   try {
//     const deletedItem = await Cart.findOneAndDelete({ owner: req.body.owner });
//     console.log("deleted", deletedItem);

//     const newCart = await Cart.create({
//       ...req.body,
//     });
//     return res.status(201).send(newCart);
//   } catch (err) {
//     console.log({ error });
//     res.status(400).send({ message: "error" });
//   }
// });

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

// mongodb+srv://Mallesh:mallesh99@cluster0.laj77zn.mongodb.net/e-commerce?retryWrites=true&w=majority
