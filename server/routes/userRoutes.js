const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUsersByRole,
} = require("../controllers/userController");
const { validateRegistration } = require("../middleware/validateUser");

router.post("/register", validateRegistration, createUser);
router.get("/", getAllUsers);
router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);
router.get('/users', getUsersByRole);

module.exports = router;
