const { User } = require("../models");
const { verifyRefreshToken, generateAccessToken } = require("./tokenServices");

const signupUser = async (firstName, lastName, email, password) => {
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  return ({firstName:user.firstName, lastName:user.lastName, email:user.email, id:user.id});
};

const loginUser = async (email, password) => {
  const user = await User.scope("withPassword").findOne({ where: { email } });
  if (!user) {
    throw new Error("User Not Found");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};



module.exports = {
  loginUser,
  signupUser,
};
