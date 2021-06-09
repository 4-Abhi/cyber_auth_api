const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validate = require("validator");

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A User Must Have Name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "A User must Have email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "A User Must Have Password"],
  },

  confirmPassword: {
    type: String,
    required: [true, "Please Confirm the Password"],
    validate: {
      validator: function (passwordConfirm) {
        return passwordConfirm === this.password;
      },
      message: "Confirm Password not Match",
    },
  },
  passwordChangedAt: Date,
});

authSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
// Instances method which is avlaible for all  document of a certain collection
authSchema.methods.correctPassword = async function (
  enterpassword,
  userpassword
) {
  const result = await bcrypt.compare(enterpassword, userpassword);
  return result;
};

const User = mongoose.model("User", authSchema);

module.exports = User;
