const { createUser } = require("../../queries/auth");
const { encrypt } = require("../../utils/hash");

module.exports = (db) => async (req, res, next) => {
  const {
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
  } = req.body;

  const queryResult = await createUser(db)({
    dni,
    nombre,
    apellido,
    email,
    password: await encrypt(password),
    telefono,
    direccion,
    barrio,
    matricula,
    role,
  });
  console.log(queryResult);
  res.status(200).json({
    succes: true,
  });
};
