const Joi = require("joi");

const refreshTokenBodyValidation = (req, res, next) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required().label("Refresh Token"),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

module.exports = { refreshTokenBodyValidation };
