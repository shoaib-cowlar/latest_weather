const authService = require("../services/authService");
const { verifyRefreshToken } = require("../services/tokenServices");
const userService = require("../services/userService");

const { User } = require("../models");


exports.signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
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
       await authService.loginUser(email, password);
      // const token = authenticatedUser.generateAuthToken();

       // Generate access token and refresh token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      reply.send({user, accessToken,refreshToken });
    }
  } catch (error) {
    console.log(error);
    reply.status(400).send({
      error: "Invalid credentials",
    });
  }
};


// Generate new access token using refresh token
exports.refreshAccessToken = async  (req, res)=> {
  const { refreshToken } = req.body;
  try {
    // Verify the refresh token
    const decodedToken = verifyRefreshToken(refreshToken);

    // Find the user in the database using the decoded token
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Generate a new access token
    const accessToken = generateAccessToken(user);

    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
}


