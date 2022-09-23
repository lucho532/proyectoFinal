const { sql } = require("slonik");

const selectFullUser = ({ email }) => {
  return sql`
        SELECT * FROM users
        WHERE email = ${email}
    `;
};

const insertUser = ({
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
  return sql`
    INSERT INTO users(
      dni, nombre, apellido, email, password, telefono,direccion,barrio, matricula,role)
       VALUES (${dni},${nombre},${apellido},${email},${password},${telefono},${direccion},${barrio},${matricula},${role});
       `;
};
const selectAllUsers = () => {
  return sql`
        SELECT * FROM users
    `;
};

const deleteOneUser = ({ email }) => {
  return sql`
        DELETE FROM users
        WHERE email = ${email};
    `;
};
module.exports = {
  insertUser,
  selectAllUsers,
  selectFullUser,
  deleteOneUser,
};
