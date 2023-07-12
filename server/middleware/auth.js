const { User } = require('../models');
const { verifyAccessToken } = require("../services/tokenServices");

const authMiddleware = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      if (!accessToken) {
        return res
          .status(401)
          .json({ message: "Permission Denied ! No Token Found" });
      }
      const decodedToken = verifyAccessToken(accessToken);
      // decoded token will have payload which have userId so directly access to userID

      // Attach the user to the request object for further use
      req.user = await User.findByPk(decodedToken.userId);
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json("Not authorized, token failed");
      // throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401).json("Not authorized, token failed");
  }
};

module.exports = authMiddleware;
