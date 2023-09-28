const express = require("express");
const reviews = express.Router();
const { Reviews, Users } = require("../models");

reviews.post("/register", (req, res) => {
  const { uid, pid, rating, review } = req.body;

  Reviews.findOrCreate({
    where: { uid, pid },
    defaults: { rating, review },
  })
    .then((rew) => res.send(rew))
    .catch((err) => res.send(err));
});

//todas
reviews.get("/", (req, res) => {
  Reviews.findAll()
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
});

//de acuerdo a una prop
reviews.get("/:pid", (req, res) => {
  const { pid } = req.params;

  Reviews.findAll({
    where: { pid },
    include: Users,
    order: [["id", "DESC"]],
  })
    .then((rev) => res.send(rev))
    .catch((err) => res.send(err));
});

//de acuerdo a un user
reviews.get("/users/:uid", (req, res) => {
  const { uid } = req.params;

  Reviews.findAll({ where: { uid }, include: Properties })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
});

reviews.delete("/:id", (req, res) => {
  const { id } = req.params;

  Reviews.destroy({ where: { id } })
    .then((filasAfectadas) => {
      if (filasAfectadas > 0) {
        res.sendStatus(200);
      } else {
        res.sendStatus(202);
      }
    })
    .catch(() => res.sendStatus(400));
});

module.exports = reviews;
