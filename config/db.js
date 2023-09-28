require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize("housedb", "brandon", process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false,
  timezone: "-03:00",
});

module.exports = db;
