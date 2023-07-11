const express = require("express");
const router = express.Router();

const {
loginUser, signupUser, refreshAccessToken, logout,
} = require("../controllers/authController");
const { validateLogin, validateRegistration } = require("../middleware/validateUser");

router.post("/login", validateLogin ,loginUser);

router.post("/signup", validateRegistration ,signupUser);


router.post('/refresh-token', refreshAccessToken);

router.post('/logout', logout);

module.exports = router;
