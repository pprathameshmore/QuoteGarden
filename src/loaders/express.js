module.exports = (app) => {
  const config = require("../configs/index");
  const express = require("express");
  const path = require("path");
  const cors = require("cors");
  const errorHandler = require("../api/middlewares/error-handler");
  const apiRouter = require("../api/routes/index");
  require("./logger")(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));

  app.use(cors());
  //API Routes
  app.use(`/${config.API_PREFIX}`, apiRouter);
  app.use(errorHandler);
};
