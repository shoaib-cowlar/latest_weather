const authService = require("../services/authService");
const userService = require("../services/userService");

exports.signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password} = req.body;
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      res.status(409).send({
        error: "User already exists",
      });
    } else {
      const user = await authService.signupUser(
        firstName,
        lastName,
        email,
        password,
      );
      res.send(user);
    }
  } catch (error) {
    res.status(400).send({
      error: "An error has occurred while creating the user",
    });
  }
};

exports.loginUser = async (request, reply) => {
  try {
    const { email, password } = request.body;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      reply.status(404).send({
        error: "User doesnt exists",
      });
    } else {
      const authenticatedUser = await authService.loginUser(email, password);
      const token = authenticatedUser.generateAuthToken();
      reply.send({ user, token });
    }
  } catch (error) {
    console.log(error);
    reply.status(400).send({
      error: "Invalid credentials",
    });
  }
};
