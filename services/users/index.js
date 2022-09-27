const router = require("express").Router();
const { authorizer } = require("../../middlewares");

module.exports = (db) => {
  router.get("/get-all", authorizer, require("./get-all")(db));
  router.get("/getFullUser", authorizer, require("./getFullUser")(db));
  return router;
};
