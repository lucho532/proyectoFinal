const {
  insertUser,
  selectAllUsers,
  selectFullUser,
  deleteOneUser,
} = require("./queries");

const { queryCatcher } = require("../utils");

const getFullUser =
  (db) =>
  async ({ email }) => {
    return await queryCatcher(
      db.maybeOne,
      "getFullUser"
    )(selectFullUser({ email }));
  };
const createUser =
  (db) =>
  async ({
    dni,
    nombre,
    apellido,
    email,
    password,
    telefono,
    direccion,
    barrio,
    matricula,
    role,
  }) => {
    const user = await getFullUser(db)({ email });
    console.log(user);
    if (user.data)
      return {
        ok: false,
        code: "duplication",
      };
    return await queryCatcher(
      db.query,
      "createUserQ"
    )(
      insertUser({
        dni,
        nombre,
        apellido,
        email,
        password,
        telefono,
        direccion,
        barrio,
        matricula,
        role,
      })
    );
  };

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

const deleteUser =
  (db) =>
  async ({ email }) => {
    return await queryCatcher(db.query, "deleteUser")(deleteOneUser({ email }));
  };
module.exports = {
  getAllUser,
  createUser,
  getFullUser,
  deleteUser,
};
