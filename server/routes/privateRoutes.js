const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const { getAdmin } = require("../controllers/privateController");

router.get("/", authMiddleware, getAdmin);

module.exports = router;
