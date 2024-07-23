const express = require("express");
const router = express.Router();

const users = require("./usersR");
const properties = require("./propertiesR");
const favorites = require("./favoritesR");
const appointments = require("./appointmentsR");
const reviews = require("./reviewsR");

router.use("/users", users);
router.use("/properties", properties);
router.use("/favorites", favorites);
router.use("/appointments", appointments);
router.use("/reviews", reviews);

module.exports = router;
