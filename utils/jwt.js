const jwt = require("jsonwebtoken");

const sign = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const verify = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error(">[verify]: ", error.message);
    return false;
  }
};
module.exports = {
  sign,
  verify,
};
