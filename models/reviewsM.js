const { Model, DataTypes } = require("sequelize");
const db = require("../config/db");

class Reviews extends Model {}

Reviews.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.INTEGER,
    },
    pid: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 250],
      },
    },
  },
  {
    sequelize: db,
    modelName: "reviews",
  }
);

module.exports = Reviews;
