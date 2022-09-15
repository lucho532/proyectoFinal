const {
  selectAllUsers,
  selectOneUser,
  deleteOneUser,
} = require("../../queries/auth/queries");
const { queryCatcher } = require("../utils");

const getAllUser = (db) => async () => {
  console.info("> db: ", db);
  return await queryCatcher(
    db.query,
    "getAllUser"
  )(
    /*funcion q se le envia al try cath */
    /*string con el q q identificamos la funcion en el try cath */
    selectAllUsers()
  );
};
const getUser =
  (db) =>
  async ({ email }) => {
    return await queryCatcher(
      db.maybeOne,
      "getOneUser"
    )(selectOneUser({ email }));
  };

const deleteUser =
  (db) =>
  async ({ email }) => {
    return await queryCatcher(db.query, "deleteUser")(deleteOneUser({ email }));
  };
module.exports = {
  getAllUser,
  getUser,
  deleteUser,
};
