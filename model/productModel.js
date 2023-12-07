const Sequelize = require("sequelize");
const DB = require("./index");
const Product = DB.define(
    "product",{
        id: {
            field: "id",
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
          productId: {
            field: "productId",
            type: Sequelize.DataTypes.INTEGER,
          },
          productName: {
            field: "productName",
            type: Sequelize.DataTypes.STRING,
          },
          quantity: {
            field: "quantity",
            type: Sequelize.DataTypes.INTEGER,
          },
          price: {
            field: "price",
            type: Sequelize.DataTypes.INTEGER,
          },
          date:{
            field: "date",
            type: Sequelize.DataTypes.DATEONLY,
          }
},
{
  timestamps: false,
  tableName: "product",
}
)
module.exports = Product