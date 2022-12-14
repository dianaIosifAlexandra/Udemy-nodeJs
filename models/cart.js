const Sequelize = require("sequelize");

const dbSequelize = require("../util/database");

const Cart = dbSequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;