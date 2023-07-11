module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define(
      'Token',
      {
        token: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        tableName: 'Tokens',
      }
    );
  
    Token.associate = (models) => {
      Token.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        as: 'user',
      });
    };
  
    return Token;
  };
  