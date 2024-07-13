const { validateToken } = require("../config/tokens.js");

function validateUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);
  const { payload } = validateToken(token);
  if (!payload) return res.sendStatus(401);
  req.user = payload;
  if (!req.user) return res.sendStatus(401);
  next();
}

module.exports = validateUser;
