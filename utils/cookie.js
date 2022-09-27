const create = (res, token, extTime = 300000) => {
  res.cookie("acces_token", token, {
    expires: new Date(Date.now() + extTime),
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true,
  });
};
const clear = (res) => {
  res.clearCookie("acces_token");
};

module.exports = {
  create,
  clear,
};
