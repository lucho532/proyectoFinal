const { createUser } = require("../../queries/auth");
const { hash, serialize } = require("../../utils");
const { register } = require("../../errors/auth");
const errors = require("../../errors/commons");

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
    password: await hash.encrypt(password),
    telefono,
    direccion,
    barrio,
    matricula,
    role,
  });

  if (!queryResult.ok) return next(register[queryResult.code] || errors[500]);
  serialize(res, { email: queryResult.data.email });

  res.status(200).json({
    succes: true,
  });
};
