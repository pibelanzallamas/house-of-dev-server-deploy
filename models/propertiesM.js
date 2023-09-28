const { Model, DataTypes } = require("sequelize");
const db = require("../config/db");

class Properties extends Model {}

Properties.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 25],
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [3, 140],
      },
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Ph", "Local", "Terreno", "Casa", "Departamento"]],
          msg: 'Elija una de las siguientes: "Ph", "Local", "Terreno", "Casa" o "Departamento".',
        },
      },
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    disponibility: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Alquiler", "Venta"]],
          msg: 'Elija una de las siguientes opciones: "Venta", "Alquiler".',
        },
      },
    },
    images: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 10000,
        max: 1000000,
      },
    },
  },
  {
    sequelize: db,
    modelName: "properties",
  }
);

module.exports = Properties;
