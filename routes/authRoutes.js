const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.SignUp);
router.post("/login", authController.login);

router.route("/").get(authController.GetAllUser);

router.route("/:id").get(authController.GetUser);

module.exports = router;
