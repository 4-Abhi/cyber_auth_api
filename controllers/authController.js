const User = require("../models/authModels");
const jwt = require("jsonwebtoken");
const { CreateToken } = require("../utils/createToken");

exports.SignUp = async (req, res) => {
  try {
    const exituser = await User.findOne({ email: req.body.email });

    if (exituser)
      return res.status(400).json({
        status: "fail",
        message: "User Already register",
      });

    const user = await User.create(req.body);

    const token = await CreateToken(user);
    user.password = undefined;

    return res.status(201).json({
      token,
      status: "Success",
      user,
    });
  } catch (err) {
    console.log("errrr", err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "No User find Please SignUp",
      });
    }
    const password = await user.correctPassword(
      req.body.password,
      user.password
    );
    if (!password) {
      return res.status(404).json({
        status: "fail",
        message: "please enterd valid email or password ",
      });
    }
    const token = CreateToken(user);
    user.password = undefined;
    return res.status(200).json({
      status: "succes",
      user,
      token,
    });
  } catch (err) {
    console.log("Errrror ", err);
  }
};

exports.GetAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.GetUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "user Cant find",
      });
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (er) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
