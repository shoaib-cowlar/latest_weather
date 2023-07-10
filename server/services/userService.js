const { User } = require("../models");

const createUser = async (firstName, lastName, email, password, role) => {
  const user = await User.create({
    firstName,
    lastName,
    email,
    role,
    password,
  });
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

const getUsersByRoles = async (role) => {
  const users = await User.findAll({
    where: {
      role,
    },
  });
  return users;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const updateUser = async (id, firstName, lastName, password) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  user.firstName = firstName;
  user.lastName = lastName;
  user.password = password;
  await user.save();
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  await user.destroy();
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUsersByRoles,
  getUserByEmail,
  updateUser,
  deleteUser,
};
