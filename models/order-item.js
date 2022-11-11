const Sequelize = require("sequelize");

const dbSequelize = require("../util/database");

const OrdertItem = dbSequelize.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = OrdertItem;
