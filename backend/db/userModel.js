// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, "Please provide an Email!"],
//     unique: [true, "Email Exist"],
//   },

//   password: {
//     type: String,
//     required: [true, "Please provide a password!"],
//     unique: false,
//   },

// });

// module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);

//new
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please provide your fullname"],
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
