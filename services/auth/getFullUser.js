const { getFullUser } = require("../../queries/auth");

module.exports = (db) => async (req, res, next) => {
  const { email } = req.body;
  const queryResult = await getFullUser(db)({ email });
  console.info(">: getuser=", getFullUser);
  console.log(queryResult);

  res.status(200).json({
    success: true,
    message: "test",
  });
};
