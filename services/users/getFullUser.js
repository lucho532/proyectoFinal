const { getFullUser } = require("../../queries/auth");
const errors = require("../../errors/commons");

module.exports = (db) => async (req, res, next) => {
  console.info("res.locals=", res.locals);
  const { email } = res.locals;
  const queryResult = await getFullUser(db)({ email });

  if (!queryResult.ok) return next(errors[400]);

  const {
    dni,
    nombre,
    apellido,
    password,
    telefono,
    direccion,
    barrio,
    matricula,
    role,
  } = queryResult.data;

  console.info(">query=", queryResult.data);

  res.status(200).json({
    success: true,
    data: {
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
    },
  });
};
