const Sequelize = require("sequelize");

const db = new Sequelize(
  "ilymrqdb",
  "ilymrqdb",
  "6MfIxBy1B6_X2Z3oTzLDb9kufGUq2wsy",
  {
    host: "suleiman.db.elephantsql.com",
    dialect: "postgres",
    logging: false,
    timezone: "-03:00",
  }
);

module.exports = db;
