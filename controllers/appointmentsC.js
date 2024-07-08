const { Appointments, Properties, Users } = require("../models");

const appointmentC = {};

appointmentC.crearApp = (req, res) => {
  const { uid, pid, date } = req.body;

  Appointments.findOrCreate({
    where: { date, pid },
    defaults: { uid },
  })
    .then((cita) => res.send(cita))
    .catch((err) => res.send(err));
};

appointmentC.allApp = (req, res) => {
  if (req.user.admin) {
    Appointments.findAll({
      include: [Properties, Users],
      order: [["date", "ASC"]],
    })
      .then((all) => res.send(all))
      .catch((err) => res.send(err));
  }
};

appointmentC.checkApp = (req, res) => {
  const { uid, pid } = req.query;

  Appointments.findOne({ where: { pid, uid }, include: Properties })
    .then((date) => res.send(date))
    .catch((err) => res.send(err));
};

appointmentC.userApp = (req, res) => {
  const { uid } = req.params;

  Appointments.findAll({ where: { uid }, include: Properties })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
};

appointmentC.delApp = (req, res) => {
  const { id } = req.params;

  Appointments.destroy({ where: { id } })
    .then((filasAfectadas) => {
      if (filasAfectadas > 0) res.sendStatus(200);
      else res.sendStatus(202);
    })
    .catch(() => res.sendStatus(400));
};

module.exports = appointmentC;
