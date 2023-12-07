const Sequelize = require("sequelize");
const DB = require("./index");
const User = DB.define(
  "user",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      field: "userId",
      type: Sequelize.DataTypes.INTEGER,
    },
   admin:{
      field: "admin",
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue:"NO",
   },
    name: {
      field: "name",
      type: Sequelize.DataTypes.STRING,
    },
    email: {
      field: "email",
      type: Sequelize.DataTypes.STRING,
    },
    password: {
        field: "password",
        type: Sequelize.DataTypes.STRING,
      },
      token: {
        field: "token",
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATE,
    },
  },
  {
    timestamps: false,
    tableName: "user",
  }
);


module.exports = User