const Sequelize = require("sequelize");

const dbSequelize = require("../util/database");

const Order = dbSequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Order;
