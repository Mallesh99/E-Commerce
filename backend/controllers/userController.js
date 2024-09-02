const User = require("../models/userModel");

const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const registerUser = async (request, response) => {
  const userExists = await User.findOne({ email: request.body.email });
  if (!userExists) {
    bcrypt
      .hash(request.body.password, 10)
      .then((hashedPassword) => {
        const user = new User({
          fullName: request.body.fullName,
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
  } else {
    response.status(500).send({
      message: "User already exists",
    });
  }
};

const loginUser = (request, response) => {
  const errors = validationResult(request);
  if (errors.isEmpty()) {
    // in case request params meet the validation criteria
    User.findOne({ email: request.body.email })
      .then((user) => {
        //start
        if (user.block) {
          return response.status(400).send({
            message: "You are being blocked by the Admin",
            error,
          });
        }
        //end
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
              "eywqwornfiohvlkdigiohggnprgjnb",
              { expiresIn: "24h" }
            ); //imp

            response.status(200).send({
              fullName: user.fullName,
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
  } else {
    response.status(422).json({ errors: errors.array() });
  }
};

const updateUser = async (req, res) => {
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
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
    if (!deletedUser) {
      res.status(404).send({ error: "User not found" });
    }
    res.send(deletedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const items = await User.find({});
    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
};

const blockUser = async (req, res) => {
  // console.log(req.body);
  const updates = Object.keys(req.body);
  const allowedUpdates = ["block"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);

    if (!user) {
      return res.status(404).send({ error: "not found" });
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  blockUser,
};
