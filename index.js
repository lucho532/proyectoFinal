require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errors = require("./errors/commons");
const { PORT } = require("./environments");

const main = async () => {
  const db = await require("./configs/db");
  const app = express();

  app.use(express.json());
  app.use(cors(options));
  app.use(cookieParser());
  app.use("/", require("./services")(db));

  app.use((_, __, next) => {
    next(errors[404]);
  });
  app.use(({ statusCode, error }, _, res, __) => {
    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  });
  app.listen(PORT, () =>
    console.info(
      `Listening at:", ${PORT} | environment:${process.env.NODE_ENV}`
    )
  );
};

main();
