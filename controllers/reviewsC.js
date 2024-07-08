const { Reviews, Users } = require("../models");
const reviewsC = {};

reviewsC.crearReview = (req, res) => {
  const { uid, pid, rating, review } = req.body;

  Reviews.findOrCreate({
    where: { uid, pid },
    defaults: { rating, review },
  })
    .then((rew) => res.send(rew))
    .catch((err) => res.send(err));
};

reviewsC.propReview = (req, res) => {
  const { pid } = req.params;

  Reviews.findAll({
    where: { pid },
    include: Users,
    order: [["id", "DESC"]],
  })
    .then((rev) => res.send(rev))
    .catch((err) => res.send(err));
};

reviewsC.userReview = (req, res) => {
  const { uid } = req.params;

  Reviews.findAll({ where: { uid }, include: Properties })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
};

reviewsC.allReview = (req, res) => {
  Reviews.findAll()
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
};

reviewsC.delReview = (req, res) => {
  const { id } = req.params;

  if (req.user.admin) {
    Reviews.destroy({ where: { id } })
      .then((filasAfectadas) => {
        if (filasAfectadas > 0) {
          res.sendStatus(200);
        } else {
          res.sendStatus(202);
        }
      })
      .catch(() => res.sendStatus(400));
  }
};

module.exports = reviewsC;
