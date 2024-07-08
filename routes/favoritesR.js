const express = require("express");
const favorites = express.Router();
const favoritesC = require("../controllers/favoritesC");

//like
favorites.post("/register", favoritesC.crearFav);

//check 1 fav
favorites.get("/find", favoritesC.checkFav);

//1 user favs
favorites.get("/:uid", favoritesC.oneFav);

//dislike
favorites.delete("/delete", favoritesC.delFav);

module.exports = favorites;
