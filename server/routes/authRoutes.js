const express = require("express");
const router = express.Router();

const {
loginUser, signupUser,
} = require("../controllers/authController");
const { validateLogin, validateRegistration } = require("../middleware/validateUser");

router.post("/login", validateLogin ,loginUser);

router.post("/signup", validateRegistration ,signupUser);

module.exports = router;
