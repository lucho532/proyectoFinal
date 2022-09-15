const router = require("express").Router();

module.exports = (db) => {
  router.get("/get-all", require("./get-all")(db));
  router.get("/user", require("./user")(db));

  return router;
};
