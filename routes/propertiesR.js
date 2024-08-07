const express = require("express");
const properties = express.Router();
const { propertiesC } = require("../controllers");
const validateUser = require("../middleware/auth");

properties.post("/register", propertiesC.crearProp);

properties.get("/all", propertiesC.allProp);

properties.get("/all/recientes", propertiesC.allReceProp);

properties.get("/all/mayor", propertiesC.mayorProp);

properties.get("/all/menor", propertiesC.menorProp);

properties.get("/:id", propertiesC.oneProp);

properties.put("/mod/:id", propertiesC.modProp);

properties.delete("/:id", propertiesC.delProp);

module.exports = properties;
