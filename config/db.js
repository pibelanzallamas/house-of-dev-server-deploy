require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSERNAME,
  process.env.DBPASSWORD,
  {
    host: process.env.DBPASSWORD,
    dialect: "postgres",
    logging: false,
    timezone: "-03:00",
  }
);
