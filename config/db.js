require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize(
  "housedb",
  "brandon",
  "oYJOZG0sw10oTC21HOgICcDa3mh6JhJu",
  {
    host: "dpg-ck4fqqk2kpls73e3ovdg-a",
    port: 5432,
    dialect: "postgres",
    logging: false,
    timezone: "-03:00",
  }
);

module.exports = db;
