const { validateToken } = require("../config/tokens.js");

function validateUser(req, res, next) {
  const cookies = require("cookie-parser");
  const token = req.cookies.token;
  console.log("token", token);
  console.log("req", req);
  if (!token) return res.sendStatus(401);
  const { payload } = validateToken(token);
  console.log("payload", payload);
  if (!payload) return res.sendStatus(401);
  req.user = payload;
  if (!req.user) return res.sendStatus(401);
  console.log("req.user", req.user);
  next();
}

module.exports = validateUser;
