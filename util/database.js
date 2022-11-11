// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'Trahiseptx2-MySQL'
// });

// module.exports = pool.promise();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Trahiseptx2-MySQL", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
