const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/db");
const routes = require("./routes");
const models = require("./models");

app.use(cookieParser());
app.use(
  cors({
    // Si aún no tenes deployado tu front en origin va la url local.
    // Una vez que se deploye el front acá va esa url que te entrega.
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", routes);

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

db.sync({ force: false })
  .then(function () {
    console.log("Base de datos conectada correctamente!");
    app.listen(5432, () =>
      console.log("Servidor escuchando en el puerto 3001")
    );
  })
  .catch(console.error);
