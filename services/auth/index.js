const router = require("express").Router();

module.exports = (db) => {
  router.post("/register", require("./register")(db));
  router.get("/get-all", require("./get-all")(db));
  router.get("/getFullUser", require("./getFullUser")(db));

  return router;
};
