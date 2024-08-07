const express = require("express");
const users = express.Router();
const { usersC } = require("../controllers");
const validateUser = require("../middleware/auth");

users.post("/register", usersC.crearUsuario);

users.post("/login", usersC.ingresoUsuario);

users.put("/:id", usersC.modUsuario);

users.delete("/:id", usersC.delUsuario);

users.get("/all", validateUser, usersC.allUsuario);

users.get("/:id", usersC.oneUsuario);

users.post("/me", usersC.meUsuario);

users.post("/logout", usersC.logoutUsuario);

users.post("/register/:email", usersC.confAppoUsuario);

users.post("/delete/:email", usersC.cancAppoUsuario);

module.exports = users;

//vaidar usuario, con user.admin
