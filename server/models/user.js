const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtCredentials } = require("../config");

async function hashPassword(user) {
  if (!user.changed("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
      },
    },

    {
      tableName: "Users",
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    },
  );

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.prototype.generateAuthToken = function () {
    const token = jwt.sign(
      {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        role: this.role,
      },
      jwtCredentials.jwtSecret,
      {
        expiresIn: "7d",
      },
    );
    return token;
  };

  return User;
};
