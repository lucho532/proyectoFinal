const jwt = require("./jwt");
const hash = require("./hash");
const cookie = require("./cookie");

const serialize = (res, payload) => {
  const token = jwt.sign(payload);
  cookie.create(res, token);
};

const deserialize = (req) => {
  const { acces_token } = req.cookies;

  const payload = jwt.verify(acces_token);
  if (!payload) return false;

  return payload;
};

module.exports = {
  jwt,
  hash,
  cookie,
  serialize,
  deserialize,
};
