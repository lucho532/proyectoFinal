const { getAllUser } = require("../../queries/auth");
const errors = require("../../errors/commons");

module.exports = (db) => async (req, res, next) => {
  const queryResult = await getAllUser(db)();
  if (!queryResult.ok) return next(errors[400]);

  res.status(200).json({
    success: true,
    message: queryResult.data,
  });
};
