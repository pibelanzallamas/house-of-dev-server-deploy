const express = require("express");
const favorites = express.Router();
const { Favorites, Properties } = require("../models");

//like
favorites.post("/register", (req, res) => {
  const { uid, pid } = req.body.data;

  Favorites.findOrCreate({
    where: { uid, pid },
  })
    .then((add) => {
      res.send(add[1]);
    })
    .catch((err) => res.send(err[1]));
});

//check 1 fav
favorites.get("/find", (req, res) => {
  const { uid, pid } = req.query;

  Favorites.findOne({ where: { pid, uid } })
    .then((fav) => res.send(fav))
    .catch((err) => res.send(err));
});

//1 user favs
favorites.get("/:uid", (req, res) => {
  const { uid } = req.params;

  Favorites.findAll({
    where: { uid },
    include: Properties,
    order: [["id", "DESC"]],
  })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
});

//1 user favs ordenados
favorites.get("/all", (req, res) => {
  const { uid } = req.params;

  Favorites.findAll({
    where: { uid },
    include: Properties,
    order: [["id", "DESC"]],
  })
    .then((fav) => res.send(fav))
    .catch((err) => res.send(err));
});

//devuelvo ALL favs
favorites.get("/realall", (req, res) => {
  Favorites.findAll({})
    .then((fav) => res.send(fav))
    .catch((err) => res.send(err));
});

//dislike
favorites.delete("/delete", (req, res) => {
  const { uid, pid } = req.body;

  Favorites.destroy({ where: { uid, pid } })
    .then((add) => {
      if (add > 0) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(400);
      }
    })
    .catch((err) => console.log("err", err));
});

module.exports = favorites;
