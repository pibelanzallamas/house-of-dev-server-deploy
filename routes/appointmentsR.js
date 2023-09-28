const express = require("express");
const appointments = express.Router();
const { Appointments, Properties, Users } = require("../models");

appointments.post("/register", (req, res) => {
  const { uid, pid, date } = req.body;

  Appointments.findOrCreate({
    where: { date, pid },
    defaults: { uid },
  })
    .then((cita) => res.send(cita))
    .catch((err) => res.send(err));
});

//check all
appointments.get("/all", (req, res) => {
  Appointments.findAll({
    include: [Properties, Users],
    order: [["date", "ASC"]],
  })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
});

//check 1 user
appointments.get("/:uid", (req, res) => {
  const { uid } = req.params;

  Appointments.findAll({ where: { uid }, include: Properties })
    .then((all) => res.send(all))
    .catch((err) => res.send(err));
});

//check 1 appointment
appointments.get("/find/one", (req, res) => {
  const { uid, pid } = req.query;

  Appointments.findOne({ where: { pid, uid }, include: Properties })
    .then((date) => res.send(date))
    .catch((err) => res.send(err));
});

appointments.delete("/:id", (req, res) => {
  const { id } = req.params;

  Appointments.destroy({ where: { id } })
    .then((filasAfectadas) => {
      if (filasAfectadas > 0) res.sendStatus(200);
      else res.sendStatus(202);
    })
    .catch(() => res.sendStatus(400));
});

module.exports = appointments;
