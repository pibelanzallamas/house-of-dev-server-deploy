const express = require("express");
const properties = express.Router();
const { propertiesC } = require("../controllers");
const validateUser = require("../middleware/auth");

properties.post("/register", validateUser, propertiesC.crearProp);

properties.get("/all", validateUser, propertiesC.allProp);

properties.get("/all/recientes", propertiesC.allReceProp);

properties.get("/all/mayor", propertiesC.mayorProp);

properties.get("/all/menor", propertiesC.menorProp);

properties.get("/:id", propertiesC.oneProp);

properties.put("/mod/:id", validateUser, propertiesC.modProp);

properties.delete("/:id", validateUser, propertiesC.delProp);

module.exports = properties;
