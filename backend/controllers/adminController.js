const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerAdmin = (request, response) => {
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
};

const loginAdmin = (request, response) => {
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
            "fijdfiodjfoiejfoiewioajoijfoijfjidfj",
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
};

module.exports = { registerAdmin, loginAdmin };
