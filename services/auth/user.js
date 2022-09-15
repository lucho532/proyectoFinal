const { getUser } = require("../../queries/auth");

module.exports = (db) => async (req, res, next) => {
  const { email } = req.body;
  const queryResult = await getUser(db)({ email });
  console.info(">: getuser=", getUser);
  console.log(queryResult);
  res.status(200).json({
    success: true,
    message: "test",
  });
};
