const { Properties } = require("../models");
const propertiesC = {};

propertiesC.crearProp = (req, res) => {
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
};

propertiesC.allProp = (req, res) => {
  Properties.findAll({
    order: [["id", "ASC"]],
  })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
};

propertiesC.allReceProp = (req, res) => {
  Properties.findAll({
    order: [["id", "DESC"]],
  })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
};

propertiesC.mayorProp = (req, res) => {
  Properties.findAll({
    order: [["price", "DESC"]],
  })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
};

propertiesC.menorProp = (req, res) => {
  Properties.findAll({
    order: [["price", "ASC"]],
  })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
};

propertiesC.oneProp = (req, res) => {
  const { id } = req.params;

  Properties.findOne({ where: { id } })
    .then((one) => res.send(one))
    .catch((err) => res.send(err));
};

propertiesC.modProp = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Properties.update(data, { where: { id } })
    .then((prop) => res.send(prop))
    .catch((err) => res.send(err));
};

propertiesC.delProp = (req, res) => {
  const { id } = req.params;

  Properties.destroy({ where: { id } })
    .then((del) => (del > 0 ? res.sendStatus(200) : res.sendStatus(400)))
    .catch((err) => res.send(err));
};

module.exports = propertiesC;
