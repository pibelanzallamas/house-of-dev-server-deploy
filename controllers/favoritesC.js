const { Favorites, Properties } = require("../models");
const favoritesC = {};

favoritesC.crearFav = (req, res) => {
  const { uid, pid } = req.body.data;

  Favorites.findOrCreate({
    where: { uid, pid },
  })
    .then((add) => {
      res.send(add[1]);
    })
    .catch((err) => res.send(err[1]));
};

favoritesC.checkFav = (req, res) => {
  const { uid, pid } = req.query;

  Favorites.findOne({
    where: { pid, uid },
  })
    .then((fav) => res.send(fav))
    .catch((err) => res.send(err));
};

favoritesC.oneFav = (req, res) => {
  const { uid } = req.params;

  Favorites.findAll({
    where: { uid },
    include: Properties,
    order: [["id", "DESC"]],
  })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
};

favoritesC.delFav = (req, res) => {
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
};

module.exports = favoritesC;
