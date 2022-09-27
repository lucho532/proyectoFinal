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

const getCorrectUser =
  (db) =>
  async ({ email, compareFn }) => {
    const user = await getFullUser(db)({ email });

    if (!user.data) {
      return {
        ok: false,
        code: "unknown",
      };
    }

    const isPasswordCorrect = await compareFn(user.data.password);
    console.info(">compare fn=", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return {
        ok: false,
        code: "unknown",
      };
    }

    return {
      ok: true,
      data: { email: user.data.email },
    };
  };
module.exports = {
  getAllUser,
  createUser,
  getFullUser,
  deleteUser,
  getCorrectUser,
};
