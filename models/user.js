const Sequelize = require("sequelize");

const dbSequelize = require("../util/database");

const User = dbSequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = User;
