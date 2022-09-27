const { cookie } = require("../../utils");

module.exports = () => (req, res, next) => {
  cookie.clear(res);
  res.status(200).json({
    success: true,
  });
};
