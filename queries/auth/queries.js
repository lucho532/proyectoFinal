const { sql } = require("slonik");
const selectAllUsers = () => {
  return sql`
        SELECT * FROM users
    `;
};
const selectOneUser = ({ email }) => {
  return sql`
        SELECT * FROM users
        WHERE email = ${email}
    `;
};

const deleteOneUser = ({ email }) => {
  return sql`
        DELETE FROM users
        WHERE email = ${email};
    `;
};
module.exports = {
  selectAllUsers,
  selectOneUser,
  deleteOneUser,
};
