const { Users } = require("../models");
const { generateToken, validateToken } = require("../config/tokens.js");
require("dotenv").config();
const transporter = require("../utils/mail");

const usersC = {};

usersC.crearUsuario = (req, res) => {
  const { email, name, password, telephone } = req.body;

  const admins = ["admin@email.com"];
  const admin = admins.includes(email);

  Users.findOrCreate({
    where: { email },
    defaults: {
      name,
      password,
      telephone,
      admin,
    },
  })
    .then((user) => res.send(user).status(200))
    .catch((err) => res.send(err).status(400));
};

usersC.ingresoUsuario = (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ where: { email } })
    .then((user) => {
      if (!user) return res.sendStatus(401); //usuario no registrado

      user.validatePassword(password).then((isValid) => {
        if (!isValid) return res.sendStatus(401); //contrasenia incorrecta

        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          telephone: user.telephone,
          admin: user.admin,
        };

        const token = generateToken(payload);
        res.cookie("token", token);
        res.send(payload);
      });
    })
    .catch((err) => res.send(err));
};

usersC.modUsuario = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Users.update(data, { where: { id } })
    .then((upd) => {
      if (upd > 0) res.sendStatus(200);
      else res.sendStatus(400);
    })
    .catch(() => res.sendStatus(400));
};

usersC.delUsuario = (req, res) => {
  const { id } = req.params;
  if (req.user.admin) {
    Users.destroy({ where: { id } })
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(400));
  }
};

usersC.allUsuario = (req, res) => {
  if (req.user.admin) {
    Users.findAll({ order: [["id", "ASC"]] })
      .then((one) => res.send(one).status(200))
      .catch((err) => res.send(err).status(400));
  }
};

usersC.oneUsuario = (req, res) => {
  const { id } = req.params;

  Users.findOne({ where: { id } })
    .then((one) => res.send(one).status(200))
    .catch((err) => res.send(err).status(400));
};

usersC.meUsuario = (req, res) => {
  res.send(req.user);
};

usersC.logoutUsuario = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

usersC.confAppoUsuario = (req, res) => {
  const { email } = req.params;
  const { date, place } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Confirmación de Cita - House of Dev",
    html: `<h1 style="color: blue;"> Su cita en ${
      place.name
    } ha sido confirmada!</h1>
    <img src="${
      place.images
    }" style="width: 150px; height: 150px; object-fit: cover; style="border: 1px solid blue; padding: 4px;"/>
    <p> La fecha reservada es a las  ${date.slice(11, 13) - 3}:${date.slice(
      14,
      16
    )}hs, el día ${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(
      0,
      4
    )}. En el dirección ${place.address} en el barrio de ${
      place.neighborhood
    }. </p> <p>Esperamos su visita! </p>
   <p>Saludos!</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) res.send(err);
    else res.send(info);
  });
};

usersC.cancAppoUsuario = (req, res) => {
  const { email } = req.params;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Cancelación de Cita - House of Dev",
    html: `<h1 style="color: blue;"> Su cita ha sido!</h1> <p> Usted o el propietario ha cancelado la cita. Para más información ingrese al sitio web. </p>
  </p> <p>Saludos!</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) res.send(err);
    else res.send(info);
  });
};

module.exports = usersC;
