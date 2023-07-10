const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      res.status(409).send({
        error: "User already exists",
      });
    } else {
      const user = await userService.createUser(
        firstName,
        lastName,
        email,
        password,
        role,
      );
      res.send(user);
    }
  } catch (error) {
    res.status(400).send({
      error: "An error has occurred while creating the user",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(400).send({
      error: "An error has occurred while fetching the users",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).send({
        error: "User doesnt exists",
      });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send({
      error: "An error has occurred while fetching the user",
    });
  }
};

const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;
    console.log(req.query);
    const users = await userService.getUsersByRoles(role);
    res.send(users);
  } catch (error) {
    res.status(400).send({
      error: "An error has occurred while fetching the user",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, password } = req.body;
    const user = await userService.getUserById(userId);

    if (!user) {
      res.status(404).send({
        error: "User doesnt exists",
      });
    } else {
      const updatedUser = await userService.updateUser(
        userId,
        firstName,
        lastName,

        password,
      );
      res.send(updatedUser);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: "An error has occurred while updating the user",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).send({
        error: "User doesnt exists",
      });
    } else {
      const deletedUser = await userService.deleteUser(userId);
      res.send("User deleted", deletedUser);
    }
  } catch (error) {
    res.status(400).send({
      error: "An error has occurred while deleting the user",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUsersByRole,
  getUserById,
  updateUser,
  deleteUser,
};
