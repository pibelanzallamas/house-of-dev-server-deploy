const { validateToken } = require("../config/tokens.js");

function validateUser(req, res, next) {
  next();
}

module.exports = validateUser;
