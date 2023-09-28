const express = require("express");
const properties = express.Router();
const { Properties } = require("../models");

properties.post("/register", (req, res) => {
  const {
    name,
    address,
    country,
    city,
    neighborhood,
    description,
    categories,
    bathrooms,
    rooms,
    disponibility,
    images,
    price,
  } = req.body;

  Properties.findOrCreate({
    where: { name },
    defaults: {
      address,
      country,
      city,
      neighborhood,
      description,
      categories,
      bathrooms,
      rooms,
      disponibility,
      images,
      price,
    },
  })
    .then((prop) => res.send(prop))
    .catch((err) => res.send(err));
});

properties.get("/all", (req, res) => {
  Properties.findAll({
    order: [["id", "ASC"]],
  })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
});

properties.get("/all/recientes", (req, res) => {
  Properties.findAll({
    order: [["id", "DESC"]],
  })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
});

properties.get("/all/mayor", (req, res) => {
  Properties.findAll({
    order: [["price", "DESC"]],
  })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
});

properties.get("/all/menor", (req, res) => {
  Properties.findAll({
    order: [["price", "ASC"]],
  })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
});

properties.get("/:id", (req, res) => {
  const { id } = req.params;

  Properties.findOne({ where: { id } })
    .then((one) => res.send(one))
    .catch((err) => res.send(err));
});

properties.put("/mod/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Properties.update(data, { where: { id } })
    .then((prop) => res.send(prop))
    .catch((err) => res.send(err));
});

properties.delete("/:id", (req, res) => {
  const { id } = req.params;

  Properties.destroy({ where: { id } })
    .then((del) => (del > 0 ? res.sendStatus(200) : res.sendStatus(400)))
    .catch((err) => res.send(err));
});

module.exports = properties;
