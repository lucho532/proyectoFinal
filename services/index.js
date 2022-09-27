const router = require("express").Router();

module.exports = (db) => {
  router.use("/auth", require("./auth")(db));
  router.use("/user", require("./users")(db));

  return router;
};
